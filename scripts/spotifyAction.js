const CLIENT_ID = 'a09b9be22e5745ae8215d4c3051a14b8'; // Replace with your actual Spotify client ID
const REDIRECT_URI = 'https://mirag8`.app'; // Ensure this matches your Spotify Developer Dashboard

document.getElementById('loginBtn').addEventListener('click', () => {
    initiateLogin();
});

async function fetchCurrentlyPlaying(accessToken) {
    try {
        const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.status === 204) {
            // No content - no track is currently playing
            document.getElementById('songName').textContent = 'No track currently playing';
            document.getElementById('artistName').textContent = '';
            document.getElementById('albumCover').src = '';
            document.getElementById('albumCover').style.display = 'none';
            document.getElementById('songName').style.display = 'block';
            document.getElementById('artistName').style.display = 'none';
            document.getElementById('songImage1').style.display = 'none';
            document.getElementById('songImage2').style.display = 'none';
            return;
        }

        if (response.ok) {
            const data = await response.json();
            if (!data.item) {
                // Handle case when data.item is null (e.g., when an ad is playing)
                document.getElementById('songName').textContent = 'Advertisement';
                console.log('No currently playing track');
                return;
            }
            const { name, album, artists, currently_playing_type, external_urls } = data.item;
            const imageUrl = album.images.length > 0 ? album.images[0].url : null;
            const artistNames = artists.map(artist => artist.name).join(', ');

            document.getElementById('songName').textContent = `${name}`;
            document.getElementById('artistName').textContent = `Artist(s): ${artistNames}`;
            document.getElementById('songImage1').src = 'images/iconPLAY.gif';
            document.getElementById('songImage2').src = 'images/music_record.gif';

            if (currently_playing_type === 'ad') {
                document.getElementById('albumCover').src = imageUrl; // Display ad image
                document.getElementById('albumCover').style.display = 'block'; // Show album cover
            } else if (imageUrl) {
                document.getElementById('albumCover').src = imageUrl;
                document.getElementById('albumCover').style.display = 'block'; // Show album cover
            } else {
                document.getElementById('albumCover').src = ''; // Clear src attribute
                document.getElementById('albumCover').style.display = 'none'; // Hide album cover if no image
            }

            // Show song images if songName and artistName are available
            if (name && artistNames) {
                document.getElementById('songName').style.display = 'block';
                document.getElementById('artistName').style.display = 'block';
                document.getElementById('songImage1').style.display = 'block';
                document.getElementById('songImage2').style.display = 'block';
            } else {
                document.getElementById('songName').style.display = 'none';
                document.getElementById('artistName').style.display = 'none';
                document.getElementById('songImage1').style.display = 'none';
                document.getElementById('songImage2').style.display = 'none';
            }

            // Reveal the song details
            document.getElementById('songDetails').style.display = 'block';

            // if (external_urls && external_urls.spotify) {
            //     console.log('URL of the currently playing song:', external_urls.spotify);
            // }
        } else {
            console.error('Failed to fetch currently playing track:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching currently playing track:', error);
    }
}

function initiateLogin() {
    const scopes = 'user-read-currently-playing';
    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = url;
}

window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.hash.substr(1));
    const accessToken = params.get('access_token');
    if (accessToken) {
        fetchCurrentlyPlaying(accessToken);
        setInterval(() => fetchCurrentlyPlaying(accessToken), 1000); // Update every second
    }
});