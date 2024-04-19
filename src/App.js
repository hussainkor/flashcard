import { useState } from 'react'
// import pizzaData from "./data"

// https://dribbble.com/shots/22487680-Food-Order
// https://dribbble.com/shots/20223703-Food-order-Mobile

export default function App() {
    const [items, setItems] = useState([])

    function handleAddItems(item) {
        setItems(items => [...items, item])
    }
    function handleDeleteItem(id) {
        setItems(items.filter((item) => item.id !== id))
    }

    function handleSoldOutItem(id) {
        setItems(items.map((item) => item.id === id ? { ...item, soldOut: !item.soldOut } : item))
    }

    return (
        <div className='item-box'>
            <h1>Pizza Menu</h1>
            <Headers onAddItems={handleAddItems} />
            <Menu items={items} onDeleteItem={handleDeleteItem} onSoldOutItem={handleSoldOutItem} />
            <Footers />
        </div>
    )
}

function Menu({ items, onDeleteItem, onSoldOutItem }) {
    const pizzaNumb = items.length;
    return <div className='item-list'>
        <h2>Special Items for you</h2>
        {pizzaNumb > 0 ? <div className="pizza-item">
            {items.map((pizza) => (
                <Pizza pizzaObj={pizza} key={pizza.name} onDeleteItem={onDeleteItem} onSoldOutItem={onSoldOutItem} />
            ))}
        </div> : <p>Oops no items available, check back later :)</p>
        }</div>
}

function Pizza({ pizzaObj, onDeleteItem, onSoldOutItem }) {
    const { title, imgUrl, ingredient, price, rating, soldOut, id } = pizzaObj;

    return <div className={`pizza-list ${soldOut ? 'sold-out' : 'on-sell'} `}>
        <img src={imgUrl} alt={title} />
        <h3>
            {title}
            <input type='checkbox' value={soldOut} onChange={(e) => onSoldOutItem(id)} />
        </h3>
        <p>{ingredient}</p>
        <p>
            {soldOut ? 'Sold out' : `₹ ${price}`}
            <span>{rating}</span> <span className="rating">★</span>
        </p>
        <button className='delete-btn' onClick={() => onDeleteItem(id)}>x</button>
    </div>
}

function Headers({ onAddItems }) {
    const [imgUrl, setImgUrl] = useState('');
    const [title, setitle] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [price, setPrice] = useState('');
    const [formControl, setFormControl] = useState(true);

    function handleAddItemSubmit(e) {
        e.preventDefault();
        if (!imgUrl || !title || !ingredient) return;

        const newItem = { imgUrl, title, ingredient, price, rating: 4.5, soldOut: false, id: Date.now() }
        onAddItems(newItem);

        setImgUrl('');
        setitle('');
        setIngredient('');
        setPrice('');
    }
    return <div className="main-header">

        <div className="add-item">
            <h2>
                Add Items
                <button onClick={() => setFormControl((s) => s = !s)} className='close-btn'>{formControl ? 'Close' : 'Open'}</button>
            </h2>
            {formControl && <form onSubmit={handleAddItemSubmit}>
                <input type="text" placeholder="Enter Image Url" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
                <input type="text" placeholder="Enter title" value={title} onChange={(e) => setitle(e.target.value)} />
                <input type="text" placeholder="Enter ingredients" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
                <input type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                <button className='submit-btn'>Submit</button>
            </form>}
        </div>
    </div>
}

function Footers() {
    const hours = new Date().getHours();
    const openHour = 10;
    const closeHour = 22;
    const isOpen = hours >= openHour && hours <= closeHour;
    return <div className="feeter">
        {isOpen ? <OpenFooter openedHour={openHour} closedHour={closeHour} /> :
            <p>We are happy to welcome you between {openHour}:00 to {closeHour}:00</p>}
    </div>
}

function OpenFooter({ openedHour, closedHour }) {
    return <>
        <p>{new Date().toLocaleTimeString()}. We're open from {openedHour}:00 to {closedHour}:00 Come visit us or order online.</p>
        <button>Order Now</button></>
}