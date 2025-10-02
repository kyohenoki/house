# house

入口、私について、記録帳、これから

### ロードマップ

- [x] 大体

- [ ] Workersで動くようにする

- [ ] 一通り完成したら記事を書いて公開する

### 開発

[LocalStack](https://www.localstack.cloud/) というR2互換S3のサーバーを立ち上げる

```
docker compose up
```

今は `ageru` という名前の R2 に記事や JSON や最適化した画像をアップロードして、生成のリクエストや Git コミットも簡単に出来るツールを作ってる

```
bun ageru [cmd]
```

Biome と Prettier（ESLint はいつか入れたいかも）

```
bun fc
```

`build` と `preview`（まだ動かない）

```
bun start
```
