import React, { useState } from 'react';
import axios from 'axios';

const ArticleForm = ({ userId, refreshList }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('name', name);
        formData.append('category', category);
        formData.append('description', description);
        if (image) formData.append('image', image);

        await axios.post('http://localhost:5000/api/articles', formData);
        setName(''); setCategory(''); setDescription(''); setImage(null);
        refreshList();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Nom de l'article" required />
            <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Categorie" required />
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
            <input type="file" onChange={e => setImage(e.target.files[0])} />
            <button type="submit">Proposer l'article</button>
        </form>
    );
};

export default ArticleForm;
