# TypeScript + React Todo アプリ

このプロジェクトは、TypeScript と React を使用して作成された Todo アプリケーションです。Mantine UI ライブラリを使用して、モダンでレスポンシブな UI を実装しています。

## 機能

- タスクの追加、編集、削除
- タスクの完了/未完了の切り替え
- タスクの優先度設定（高・中・低）
- タスクの期限設定
- レスポンシブデザイン（スマホ対応）
- ローカルストレージを使用したデータの永続化

## 技術スタック

- React
- TypeScript
- Vite
- Mantine UI
- ESLint
- Prettier

## セットアップ

1. リポジトリのクローン

```bash
git clone https://github.com/your-username/typescript-react-todo.git
cd typescript-react-todo
```

2. 依存関係のインストール

```bash
npm install
```

3. 開発サーバーの起動

```bash
npm run dev
```

4. ビルド

```bash
npm run build
```

## プロジェクト構造

```
src/
  ├── components/
  │   └── TodoList/
  │       ├── TaskForm.tsx
  │       ├── TaskItem.tsx
  │       └── TodoList.tsx
  ├── hooks/
  │   └── useTodoList.ts
  ├── types/
  │   └── task.ts
  ├── App.tsx
  └── main.tsx
```

## 主な実装ポイント

1. カスタムフック（useTodoList）

   - タスクの状態管理
   - ローカルストレージとの連携
   - 編集モードの管理

2. コンポーネント設計

   - 編集モードと表示モードの分離
   - レスポンシブデザイン
   - アクセシビリティ対応

3. TypeScript の活用
   - 型安全性の確保
   - インターフェースの定義
   - ジェネリック型の使用

## ライセンス

MIT

## 作者

[Your Name]
