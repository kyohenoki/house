# house

入口、私について、記録帳、これから

[kyohenoki](https://kyohenoki.com) の設計図

### ロードマップ

- [x] 大体

- [ ] Workers で動くようにする

- [ ] 一通り完成したら記事を書いて公開する

### 開発

依存関係などをリセットする
以下の Shell ファイルを初めて実行する場合は権限もつけておく

```
chmod +x cmd.sh
bun reset
```

LocalStack というR2互換S3のサーバーを立ち上げる

```
docker compose up
```

今は `ageru` という名前の R2 に記事や JSON や最適化した画像をアップロードして、生成のリクエストや Git コミットも簡単に出来るツールを作ってる

```
bun ageru [cmd]
```

現時点では以下のコマンドを実行する必要がある（ローカルで S3 のサーバーを立ち上げるたびに行う）

```
bun ageru s3
```

ファイルの通信のテスト（今まで使っていたが必要なくなるもの）

```
bun dasu
```

Astro の開発サーバーを建てる

```
bun dev
```

Biome と Prettier を同時に（ESLint か Oxlint をいつか入れたいかも）

```
bun check
```

`.env` 等を更新した際は Workers 用の型情報の更新も忘れずに

```
bun types
```

`build` と `preview`（まだ動かない）

```
bun start
```
