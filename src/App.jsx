
import { useEffect, useState } from 'react'

export default function App() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load students')
        return response.json()
      })
      .then((data) => {
        setStudents(
          data.map((student) => ({
            ...student,
            marks: 70 + (student.id % 5) * 5,
          }))
        )
      })
      .catch(() => setError('Could not load students. Please check your internet connection.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
              Practical 17 · Fetch API
            </p>
            <h1 className="mt-2 text-4xl font-black sm:text-5xl">
              Student<span className="text-cyan-400">Sphere</span>
            </h1>
            <p className="mt-3 text-slate-400">
              Student records fetched from a live API.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-4">
            <p className="text-sm text-slate-400">Total Students</p>
            <p className="text-3xl font-black text-cyan-300">
              {loading ? '...' : students.length}
            </p>
          </div>
        </header>

        {loading && (
          <p className="rounded-2xl bg-slate-900 p-6 text-center text-cyan-300">
            Loading student records...
          </p>
        )}

        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
            {error}
            <button
              onClick={() => window.location.reload()}
              className="ml-3 underline"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-800 text-sm uppercase text-slate-300">
                  <tr>
                    <th className="px-5 py-4">ID</th>
                    <th className="px-5 py-4">Student</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">City</th>
                    <th className="px-5 py-4">Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {students.map((student) => (
                    <tr key={student.id} className="transition hover:bg-slate-800/70">
                      <td className="px-5 py-4 font-bold text-cyan-300">
                        {student.id}
                      </td>
                      <td className="px-5 py-4 font-semibold">{student.name}</td>
                      <td className="px-5 py-4 text-slate-400">{student.email}</td>
                      <td className="px-5 py-4 text-slate-300">{student.address.city}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-emerald-400/10 px-3 py-2 font-bold text-emerald-300">
                          {student.marks}/100
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <p className="mt-5 text-center text-sm text-slate-500">
          Powered by JSONPlaceholder API · React useEffect
        </p>
      </div>
    </main>
  )
}
