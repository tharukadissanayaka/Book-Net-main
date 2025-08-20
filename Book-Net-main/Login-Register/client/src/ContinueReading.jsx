import React from "react";
import NavBar from "./NavBar";
import "./ContinueReading.css";

<img src="/Pictures/Beige Black Brown Minimalist Photo Collage Puzzles Kindle Book Cover.png" alt="Beast Cover" />


function ContinueReading() {
  const books = [
    {
      title: "Puzzels",
      author: "Hae-Won Jeon",
      cover: BeastCover,
      episode: 3,
      page: 20,
      text: `Life is a puzzle, a complex and ever-evolving mystery that each of us is trying to 
      solve. From the moment we are born, we begin collecting pieces—experiences, emotions,
       relationships, and lessons—that slowly come together to shape the person we become. 
       Sometimes the pieces fit perfectly and we experience clarity and joy, while other times
        they seem to clash or disappear, leaving us feeling confused, frustrated, or lost. 
        Just like a challenging jigsaw puzzle, life requires patience and perseverance. 
        We may not always see the bigger picture, and some parts may remain hidden or incomplete
        for a long time. But every piece, no matter how small or difficult to place, plays a
        vital role in completing the whole image. The struggles we face, the mistakes we make, 
        and the successes we celebrate all contribute to the unique masterpiece of our existence.
        Moreover, life’s puzzle is not just about fitting pieces together individually; 
        it also involves understanding how our pieces connect with others—family, friends, and 
        even strangers—adding depth and color to our story. Ultimately, the beauty of life lies 
        not just in finishing the puzzle but in embracing the journey of discovery, growth, and 
        transformation that comes with each new piece we find and place. It reminds us that even 
        when things seem scattered or broken,
        with time and effort, the picture will become clearer and more meaningful.
        Just like a puzzle, life rarely comes with a clear instruction manual. We often face 
        moments where the pieces seem completely mismatched, and the path forward is unclear. 
        During these times, it’s easy to feel overwhelmed or discouraged. Yet, it is precisely in 
        these moments of uncertainty that we learn the most about ourselves—our strengths, our 
        values, and what truly matters. Each piece, no matter how challenging, teaches us resilience
        and helps us develop a deeper understanding of the world around us. The process of trial 
        and error, of searching for the right fit, is what makes the final image so rewarding.
        Another important aspect of life’s puzzle is that some pieces can only be connected with
        time. Just as some parts of a jigsaw puzzle may be hidden beneath others or take longer 
        to find, certain truths and opportunities in life reveal themselves gradually. 
        We might not understand the purpose of a difficult experience or a chance meeting right 
        away, but with patience and reflection, these moments often become the key to unlocking a 
        greater part of our story. This teaches us to trust the process and have faith that every 
        piece has its place, even if it’s not immediately obvious.`,
    },
   
  ];

  return (
    <div className="continuereading-page">
      {/* Navigation bar */}
      <NavBar activePage="readinglist" />

      {/* Main content area */}
      <div className="continuereading-content">
        {/* Left side - main book image */}
        <div className="main-preview">
          <img
            src={books[0].cover}
            alt={books[0].title}
            className="main-cover"
          />
        </div>

        {/* Right side - details */}
        <div className="book-details">
          <h2 className="book-title">{books[0].title}</h2>
          <p className="book-author">By {books[0].author}</p>
          <div className="book-meta">
            <span>Episode {books[0].episode}</span>
            <span>Page {books[0].page}</span>
          </div>
          <p className="book-text">{books[0].text}</p>
          <div className="nav-buttons">
            <button className="nav-btn">← Previous</button>
            <button className="nav-btn">Next →</button>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default ContinueReading;
