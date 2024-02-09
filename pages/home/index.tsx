import Head from "next/head";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <header className="border-b border-gray-300 py-4">
        <h1 className="text-3xl font-bold">ウィキペディア メインページ</h1>
        <p className="text-sm">
          ウィキペディアは誰でも編集できるフリー百科事典です
        </p>
      </header>
      <div className="flex mt-6">
        <main className="w-3/4 pr-4">
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-2">選り抜き記事</h2>
            <article className="border border-gray-300 p-4">
              <img
                src="https://placehold.co/300x200"
                alt="Aurora borealis over a forest with a starry sky"
                className="mb-4"
              />
              <p className="text-sm mb-2">
                オーロラは、天体の磁気圏に囚われる太陽の発光現象である。極光とも呼ばれる...
              </p>
              <div className="text-blue-600 text-sm">
                続きを読む / おまかせ表示 / つまみ読み / 選考
              </div>
            </article>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-2">新着記事</h2>
            <ul className="list-disc pl-5">
              <li className="mb-2 text-sm">
                この星は地球の最も近い恒星系である...
              </li>
              <li className="mb-2 text-sm">木内鶴彦は、日本の経済学者...</li>
              <li className="mb-2 text-sm">大内光圀は、日本の戦国大名...</li>
            </ul>
            <div className="text-blue-600 text-sm">
              続きを読む / おまかせ表示 / つまみ読み / 選考
            </div>
          </section>
        </main>
        <aside className="w-1/4">
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-2">今日の一枚</h2>
            <article className="border border-gray-300 p-4">
              <img
                src="https://placehold.co/300x200"
                alt="Grey heron (Ardea cinerea) standing in water"
                className="mb-4"
              />
              <div className="text-sm">アオサギ (Ardea cinerea)、湿原にて</div>
              <div className="text-blue-600 text-sm">
                続きを読む / 寄贈 / 掲載
              </div>
            </article>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-2">今日は何の日 2月9日</h2>
            <ul className="list-disc pl-5">
              <li className="mb-2 text-sm">
                伊能忠敬が日本初の実測に基づく...
              </li>
              <li className="mb-2 text-sm">
                ウィリアム・G・モーガンがバレーボールを考案 (1895年)
              </li>
              <li className="mb-2 text-sm">ミュンヘン一揆...</li>
            </ul>
            <div className="text-blue-600 text-sm">
              続きを読む / おまかせ表示 / つまみ読み / 選考
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
