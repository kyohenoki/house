import type { Metadata } from 'next'
import '@/katachi/kiroku/mitame.css'

export const metadata: Metadata = {
  title: '見た目の確認',
  description: 'こんな風に表示する'
}

export default function Kiroku() {
  return (
    <div className="pt-0.5 w-full flex flex-col">
      <h1 className="text-[1.35rem]">見た目の確認</h1>
      <div className="w-full my-2 border-b-1 border-stone-200" />
      <div className="text-stone-700">
        <p className="paragraph">Markdownの全ての見え方</p>
        <p className="paragraph">
          <strong className="strong">太字ならこんな感じ</strong>
        </p>
        <p className="paragraph">
          <em>斜体も使わないけどある</em>
        </p>
        <h1 className="header h1">一番大きな見出し</h1>
        <p className="paragraph">大きな見出しだねー</p>
        <h1 className="header h1">
          <strong className="strong">一番大きな見出し</strong>
        </h1>
        <p className="paragraph">太字は自分で宣言しよう！</p>
        <h2 className="header h2">2番目の見出し</h2>
        <p className="paragraph">大きさはあまり変わらない</p>
        <h3 className="header h3">
          <strong className="strong">これは3番目！</strong>
        </h3>
        <p className="paragraph">これを主に見出しに使う</p>
        <h4 className="header h4">4番目はギリギリ最後</h4>
        <p className="paragraph">h5やh6は作る？使う？</p>
        <h5 className="header h5">h5だよ！</h5>
        <h6 className="header h6">h6は区別に使う？</h6>
        <code className='coded'>console.log("Hello World")</code>
      </div>
    </div>
  )
}
