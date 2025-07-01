# SocialX – A World-Class Social Media Frontend

**SocialX** is a modern, scalable, and modular social media frontend built with [Next.js](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), and [Supabase](https://supabase.com/) as the backend. 

Inspired by leading platforms and real-world UI screenshots, SocialX features:

- Trending topics and search
- Rich user profile pages with tabs and stats
- Responsive feed with posts, images, engagement
- Floating action button and bottom navigation
- Ready for Supabase authentication, storage, and real-time updates

---

## Getting Started

1. **Clone this repo**

    ```sh
    git clone https://github.com/yourusername/socialx.git
    cd socialx
    ```

2. **Install dependencies**

    ```sh
    npm install
    ```

3. **Configure Supabase**

    - Create a project at [supabase.com](https://supabase.com/)
    - Copy your project’s `SUPABASE_URL` and `SUPABASE_ANON_KEY`
    - Create a `.env.local` file and add:

        ```
        NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
        NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
        ```

4. **Run locally**

    ```sh
    npm run dev
    ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

---

## Project Structure

- `pages/` – Next.js routes (Feed, Trending, Search, Profile)
- `components/` – Modular UI components
- `supabase/` – Supabase client
- `utils/` – Utility functions
- `styles/` – Tailwind and global styles

---

## Database Tables (Supabase example)

- `profiles`: user_id, username, display_name, avatar_url, bio, verified, category, website, birthdate, joined_at, followers, following
- `posts`: id, user_id, content, media_url, created_at, comment_count, retweet_count, like_count, view_count
- `trends`: id, rank, category, topic, post_count

---

## License

MIT
