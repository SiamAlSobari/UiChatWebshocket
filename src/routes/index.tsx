// app/routes/__root.tsx
import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
      {/* Dekorasi latar */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40 -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-40 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center max-w-2xl w-full"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
          Selamat Datang di <span className="text-blue-600">ChatApp</span>
        </h1>

        <p className="text-gray-600 text-lg md:text-xl mb-10">
          Aplikasi chat modern dengan kecepatan real-time dan desain elegan.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-sm mb-10"
        >
          <h3 className="font-semibold text-gray-800 mb-3 text-lg flex items-center justify-center gap-2">
            ✨ Fitur Unggulan
          </h3>
          <ul className="text-gray-600 space-y-2">
            <li>💬 Chat real-time dengan teman dan grup</li>
            <li>🧩 Tampilan modern dan intuitif</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-sm">
            Masuk
          </button>

          <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 active:scale-95 transition-all">
            Daftar
          </button>
        </motion.div>

        <footer className="mt-16 text-sm text-gray-400">
          © {new Date().getFullYear()} ChatApp — Dibuat dengan ❤️ oleh Ym
        </footer>
      </motion.div>
    </div>
  )
}
