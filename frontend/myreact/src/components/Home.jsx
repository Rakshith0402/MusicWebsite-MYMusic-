import React from 'react';
import backgroundImage from '../public/black-white-confetti-silhouette-crowd-600nw-458794543.webp'; // Replace with your image path


const Home = () => {
    return (
        <div
            className="home-background"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '100vh', // Adjust height as needed
                backgroundColor: '#000000', // Fallback color
                padding: '20px',
            }}
        >
            <div className='Home'>
                <div class="texcontainer">
                    <h1><div class="welcome">Welcome,</div> To MyMusic</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci vel quod ullam sed officiis dolorem magni, impedit provident labore! Autem necessitatibus quam tempore, earum libero numquam assumenda rem exercitationem quidem.</p>
                </div>
                <button class="butt1"><a href="/Register" class="href">Getting Started</a></button>
            </div>
        </div>
    );
};

export default Home;
