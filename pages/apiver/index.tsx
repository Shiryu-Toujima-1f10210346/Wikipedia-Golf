import React, { useState, useEffect } from "react";

export default function Home() {
  const [article, setArticle] = useState("メインページ");
  const [content, setContent] = useState("");
  const [history, setHistory] = useState<
    { title: string; url: string; stroke?: number }[]
  >([]);

  useEffect(() => {
    fetchArticle(article);
  }, [article]);

  useEffect(() => {
    const links = document.querySelectorAll("#articleContent a");
    links.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
    };
  }, [content]);

  const fetchArticle = async (title: string) => {
    const url = `https://ja.wikipedia.org/w/api.php?action=parse&page=${title}&format=json&origin=*`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setContent(data.parse.text["*"]);
      setHistory((prevHistory) => [...prevHistory, { title, url }]);
    } catch (error) {
      console.error("記事の取得に失敗しました", error);
    }
  };

  const handleLinkClick = (event: any) => {
    event.preventDefault();
    const title = event.target.getAttribute("title");
    if (title) {
      setArticle(title);
    }
  };

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        id="articleContent"
      ></div>
      <div>
        <h2>履歴</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              {index + 1}:{" "}
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
