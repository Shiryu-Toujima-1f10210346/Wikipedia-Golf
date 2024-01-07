import React, { useState, useEffect } from "react";

export default function Home() {
  const [article, setArticle] = useState("メインページ");
  const [content, setContent] = useState("");
  const [history, setHistory] = useState<
    { title: string; url: string; stroke: number }[]
  >([]);
  const [stroke, setStroke] = useState(0);

  const pickRandom = async () => {
    try {
      const response = await fetch(
        "https://ja.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json&origin=*"
      );
      const data = await response.json();
      const randomTitle = data.query.random[0].title;
      setArticle(randomTitle);
    } catch (error) {
      console.error("ランダムなページの取得に失敗しました", error);
    }
  };

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
      if (title !== "メインページ") {
        setStroke(stroke + 1);
        setHistory((prev) => [
          ...prev,
          { title: title, url: url, stroke: stroke + 1 },
        ]);
      }
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

  const handleBackClick = () => {
    if (history[history.length - 1].title)
      setArticle(history[history.length - 1].title);
    setHistory(history.slice(0, history.length - 1));
    setStroke(stroke - 1);
    //strokeが0の時に戻るボタンを押したらメインページに戻る
  };

  return (
    <div className="bg-gray-100">
      <div className="sticky top-0 z-10 bg-black text-white flex justify-center items-center">
        {/* ヘッダーセクション */}
        <p className="text-center text-3xl py-4">
          打数:<span className="text-5xl font-bold"> {stroke}</span>
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-6 rounded"
          onClick={pickRandom}
        >
          ランダム
        </button>
        {/* <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleBackClick}
        >
          戻る
        </button> */}
      </div>
      <div className="bg-gray-100 text-black mr-96 flex flex-row justify-start items-start">
        {/* 履歴セクション */}
        <div className="history flex-none w-1/4 p-4 bg-white border-r-2 border-white rounded-2xl">
          <h2>履歴</h2>
          <ul>
            {history.map((item, index) => (
              <li key={index}>
                {item.stroke}:{" "}
                {/* <a href={item.url} title={item.title}>
                  {item.title}
                </a> */}
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* コンテンツセクション */}
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          id="articleContent"
          className="flex-grow p-4 flex flex-col "
        ></div>
      </div>
    </div>
  );
}
