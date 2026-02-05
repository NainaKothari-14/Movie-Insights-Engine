export function posterFor(title) {
  // Array of cinematic/movie-themed images from Unsplash
  const movieImages = [
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=900&fit=crop', // Cinema atmosphere
    'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&h=900&fit=crop', // Vintage camera
    'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=600&h=900&fit=crop', // Film strips
    'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=600&h=900&fit=crop', // Movie clapper
    'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=600&h=900&fit=crop', // Stage/theater
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=900&fit=crop', // Red carpet event
    'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&h=900&fit=crop', // Cinema projection
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=900&fit=crop', // Movie theater seats
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=900&fit=crop', // Dark cinema
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=900&fit=crop', // Film reels
    'https://images.unsplash.com/photo-1574267432644-f65e25c0ce09?w=600&h=900&fit=crop', // Movie production
    'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=600&h=900&fit=crop', // Popcorn closeup
  ];
  
  // Use title to consistently pick the same image for the same movie
  const hash = title ? title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
  const imageIndex = hash % movieImages.length;
  
  return movieImages[imageIndex];
}