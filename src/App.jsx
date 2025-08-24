import React, { useState, useEffect } from 'react';

const initialTweets = [{'id': 1, 'date': '2020-01-01', 'content': 'Sample tweet for thecollegedropout era.', 'tags': ['music', 'era'], 'era': 'thecollegedropout'}, {'id': 2, 'date': '2020-01-02', 'content': 'Sample tweet for lateregistration era.', 'tags': ['music', 'era'], 'era': 'lateregistration'}, {'id': 3, 'date': '2020-01-03', 'content': 'Sample tweet for graduation era.', 'tags': ['music', 'era'], 'era': 'graduation'}, {'id': 4, 'date': '2020-01-04', 'content': 'Sample tweet for 808s era.', 'tags': ['music', 'era'], 'era': '808s'}, {'id': 5, 'date': '2020-01-05', 'content': 'Sample tweet for mbdtf era.', 'tags': ['music', 'era'], 'era': 'mbdtf'}, {'id': 6, 'date': '2020-01-06', 'content': 'Sample tweet for wtt era.', 'tags': ['music', 'era'], 'era': 'wtt'}, {'id': 7, 'date': '2020-01-07', 'content': 'Sample tweet for cruelsummer era.', 'tags': ['music', 'era'], 'era': 'cruelsummer'}, {'id': 8, 'date': '2020-01-08', 'content': 'Sample tweet for yeezus era.', 'tags': ['music', 'era'], 'era': 'yeezus'}, {'id': 9, 'date': '2020-01-09', 'content': 'Sample tweet for shmg era.', 'tags': ['music', 'era'], 'era': 'shmg'}, {'id': 10, 'date': '2020-01-10', 'content': 'Sample tweet for tlop era.', 'tags': ['music', 'era'], 'era': 'tlop'}, {'id': 11, 'date': '2020-01-11', 'content': 'Sample tweet for ye era.', 'tags': ['music', 'era'], 'era': 'ye'}, {'id': 12, 'date': '2020-01-12', 'content': 'Sample tweet for yandhi era.', 'tags': ['music', 'era'], 'era': 'yandhi'}, {'id': 13, 'date': '2020-01-13', 'content': 'Sample tweet for jik era.', 'tags': ['music', 'era'], 'era': 'jik'}, {'id': 14, 'date': '2020-01-14', 'content': 'Sample tweet for donda era.', 'tags': ['music', 'era'], 'era': 'donda'}, {'id': 15, 'date': '2020-01-15', 'content': 'Sample tweet for donda2 era.', 'tags': ['music', 'era'], 'era': 'donda2'}, {'id': 16, 'date': '2020-01-16', 'content': 'Sample tweet for vultures1 era.', 'tags': ['music', 'era'], 'era': 'vultures1'}, {'id': 17, 'date': '2020-01-17', 'content': 'Sample tweet for vultures2 era.', 'tags': ['music', 'era'], 'era': 'vultures2'}, {'id': 18, 'date': '2020-01-18', 'content': 'Sample tweet for bully era.', 'tags': ['music', 'era'], 'era': 'bully'}, {'id': 19, 'date': '2020-01-19', 'content': 'Sample tweet for cuck era.', 'tags': ['music', 'era'], 'era': 'cuck'}];

function App() {
  const [selectedTag, setSelectedTag] = useState(null);
  const [search, setSearch] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showAlbums, setShowAlbums] = useState(false);

  const filteredTweets = initialTweets
    .filter(t => !selectedTag || t.tags.includes(selectedTag) || t.era === selectedTag)
    .filter(t => t.content.toLowerCase().includes(search.toLowerCase()));

  const allTags = Array.from(new Set(initialTweets.flatMap(t => t.tags)));
  const allEras = ['thecollegedropout', 'lateregistration', 'graduation', '808s', 'mbdtf', 'wtt', 'cruelsummer', 'yeezus', 'shmg', 'tlop', 'ye', 'yandhi', 'jik', 'donda', 'donda2', 'vultures1', 'vultures2', 'bully', 'cuck'];

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="container">
      <h1 className="headline">Ye Tweets</h1>
      <div className="search-wrapper">
        <input
          className="searchbar"
          placeholder="Search tweets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="tags">
        <button onClick={() => setSelectedTag(null)} className={!selectedTag ? 'active' : ''}>All</button>
        <button onClick={() => setShowAlbums(!showAlbums)} className={showAlbums ? 'active' : ''}>Albums</button>
        {allTags.map(tag => (
          <button key={tag} onClick={() => setSelectedTag(tag)} className={selectedTag === tag ? 'active' : ''}>
            #{tag}
          </button>
        ))}
      </div>
      {showAlbums && (
        <div className="tags">
          {allEras.map(era => (
            <img
              key={era}
              src={import.meta.env.BASE_URL + `album_${era}.jpeg`}
              className={`tag-album-icon ${selectedTag === era ? 'active' : ''}`}
              onClick={() => setSelectedTag(era)}
              title={era}
              alt={era}
            />
          ))}
        </div>
      )}
      <div className="tweets">
        {filteredTweets.map(tweet => (
          <div key={tweet.id} className="tweet">
            <div className="header">
              <img src={import.meta.env.BASE_URL + 'kanyeprofile1.jpeg'} className="avatar" />
              <div>
                <div className="name">Ye <span className="handle">@kanyewest</span></div>
                <div className="date">{new Date(tweet.date).toDateString()}</div>
              </div>
            </div>
            <p className="content">{tweet.content}</p>
            <div className="taglist">
              {tweet.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
              {tweet.era && <img className="tag-album" src={import.meta.env.BASE_URL + `album_${tweet.era}.jpeg`} alt={tweet.era} />}
            </div>
          </div>
        ))}
      </div>
      {showScrollTop && (
        <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>⌅</button>
      )}
    </div>
  );
}

export default App;