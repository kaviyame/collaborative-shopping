import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../src/config';
import ItemLinkWithPreview from './ItemLinkWithPreview'; // Import the new component

function HomeScreen() {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [selectedList, setSelectedList] = useState({ id: null, name: '', items: [] });
  const [itemUrl, setItemUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLists = async () => {
      if (auth.currentUser) {
        try {
          const response = await fetch(`${BASE_URL}/api/lists/${auth.currentUser.uid}`);
          const data = await response.json();
          setLists(data);
        } catch (error) {
          console.error("Failed to fetch lists:", error);
        }
      }
    };

    fetchLists();
  }, [auth.currentUser]);

  const handleLogout = () => {
    signOut(auth);
  };

  const handleCreateList = async (e) => {
    e.preventDefault();
    if (newListName.trim() === '') return;

    try {
      const response = await fetch(`${BASE_URL}/api/lists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: auth.currentUser.uid, name: newListName }),
      });
      const createdList = await response.json();
      setLists([...lists, createdList]);
      setNewListName('');
    } catch (error) {
      console.error("Failed to create list:", error);
    }
  };

  const handleSelectList = async (listId, listName) => {
    try {
      const response = await fetch(`${BASE_URL}/api/lists/${auth.currentUser.uid}/${listId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch list items');
      }
      const items = await response.json();
      setSelectedList({ id: listId, name: listName, items });
    } catch (error) {
      console.error("Failed to select list:", error);
    }
  };

  const handleAddItem = async () => {
    if (itemUrl.trim() === '' || !selectedList.id) return;

    try {
      const response = await fetch(`${BASE_URL}/api/lists/${selectedList.id}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: itemUrl }),
      });
      const updatedList = await response.json();
      setSelectedList(prev => ({ ...prev, items: updatedList.items }));
      setItemUrl('');
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  return (
    <div>
      <h2>Welcome, {auth.currentUser?.displayName || 'User'}!</h2>
      <button onClick={() => navigate('/profile')}>Go to Profile</button>
      <button onClick={handleLogout}>Logout</button>

      <h3>My Lists</h3>
      <form onSubmit={handleCreateList}>
        <input
          type="text"
          placeholder="Create new list"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          required
        />
        <button type="submit">Create New List</button>
      </form>

      <div>
        {lists.map((list) => (
          <div key={list._id}>
            <h4 onClick={() => handleSelectList(list._id, list.name)} style={{ cursor: 'pointer' }}>{list.name}</h4>
          </div>
        ))}
      </div>

      {selectedList.id && (
        <div>
          <h4>Items in {selectedList.name}</h4>
          <ul>
            {selectedList.items.map((item, index) => (
              <li key={index}>
                <ItemLinkWithPreview item={item} /> {/* Use the ItemLinkWithPreview component */}
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Enter item URL"
            value={itemUrl}
            onChange={(e) => setItemUrl(e.target.value)}
          />
          <button onClick={handleAddItem}>Add Item</button>
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
