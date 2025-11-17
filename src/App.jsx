import { useState } from 'react'
import PainPointSelector from './components/PainPointSelector'
import Benefits from './components/Benefits'
import TasksOverview from './components/TasksOverview'
import LeadForm from './components/LeadForm'

function App() {
  const [selectedPainPoints, setSelectedPainPoints] = useState([])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded bg-blue-600" aria-hidden="true" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Professional AC Maintenance</h1>
              <p className="text-sm text-gray-600">Preventive service for split and ducted systems (1–50 ton)</p>
            </div>
          </div>
          <a href="#book" className="hidden md:inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded">Book a call</a>
        </div>
      </header>

      <main>
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Keep your air conditioning reliable, efficient, and compliant</h2>
              <p className="text-gray-700">We deliver scheduled preventive maintenance at a cadence that suits your operation. Our technicians service split and ducted air conditioners across residential, commercial, and light-industrial sites.</p>
              <PainPointSelector onSelectedChange={setSelectedPainPoints} />
            </div>
            <div className="space-y-8">
              <Benefits selected={selectedPainPoints} />
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <TasksOverview />
              </div>
            </div>
          </div>
        </section>

        <section id="book" className="bg-white border-t">
          <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Ready to improve uptime and efficiency?</h2>
              <p className="text-gray-700">Answer a few details and we will schedule a consultation to scope your maintenance plan.</p>
              <ul className="text-gray-700 list-disc pl-6 space-y-1">
                <li>Certified technicians and documented service</li>
                <li>Flexible intervals: Monthly, Quarterly, Bi-Annual, Annual</li>
                <li>Service coverage: 1 to 50 ton capacity</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <LeadForm defaultPainPoints={selectedPainPoints} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <p>© {new Date().getFullYear()} AC Maintenance Service</p>
          <p>Professional tone, non-humorous visuals</p>
        </div>
      </footer>
    </div>
  )
}

export default App
