import { useState } from 'react'

export default function LeadForm({ defaultPainPoints = [] }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', location: '',
    unit_types: [], units_count: '', capacity_tonnage: '', preferred_interval: '',
    pain_points: defaultPainPoints, message: ''
  })
  const [status, setStatus] = useState(null)

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Submitting...')
    try {
      const res = await fetch(`${baseUrl}/api/leads`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          units_count: form.units_count ? Number(form.units_count) : undefined,
        })
      })
      if (!res.ok) throw new Error('Submission failed')
      setStatus('Thank you. We will reach out shortly to schedule a call.')
      setForm({ name: '', email: '', phone: '', company: '', location: '', unit_types: [], units_count: '', capacity_tonnage: '', preferred_interval: '', pain_points: defaultPainPoints, message: '' })
    } catch (e) {
      setStatus('There was an issue. Please try again or email us directly.')
    }
  }

  const unitTypeOptions = ['Split', 'Ducted', 'VRF', 'Package']
  const intervalOptions = ['Monthly', 'Quarterly', 'Bi-Annual', 'Annual']

  return (
    <form onSubmit={submit} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Book a call</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <input className="border border-gray-300 rounded p-2" placeholder="Full name" value={form.name} onChange={(e) => update('name', e.target.value)} required />
        <input className="border border-gray-300 rounded p-2" placeholder="Email address" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required />
        <input className="border border-gray-300 rounded p-2" placeholder="Phone" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
        <input className="border border-gray-300 rounded p-2" placeholder="Company / Property" value={form.company} onChange={(e) => update('company', e.target.value)} />
        <input className="border border-gray-300 rounded p-2" placeholder="Location (City/Area)" value={form.location} onChange={(e) => update('location', e.target.value)} />
        <input className="border border-gray-300 rounded p-2" placeholder="Units Count" type="number" min="0" value={form.units_count} onChange={(e) => update('units_count', e.target.value)} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Unit Types</label>
          <div className="flex flex-wrap gap-2">
            {unitTypeOptions.map((t) => (
              <button type="button" key={t} onClick={() => update('unit_types', form.unit_types.includes(t) ? form.unit_types.filter(i => i !== t) : [...form.unit_types, t])} className={`px-3 py-1 rounded border ${form.unit_types.includes(t) ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Capacity Range</label>
          <input className="border border-gray-300 rounded p-2 w-full" placeholder="e.g., 1–50 ton (12,000–600,000 Btu/h)" value={form.capacity_tonnage} onChange={(e) => update('capacity_tonnage', e.target.value)} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Preferred Service Interval</label>
          <div className="flex flex-wrap gap-2">
            {intervalOptions.map((t) => (
              <button type="button" key={t} onClick={() => update('preferred_interval', form.preferred_interval === t ? '' : t)} className={`px-3 py-1 rounded border ${form.preferred_interval === t ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Additional Context</label>
          <textarea className="border border-gray-300 rounded p-2 w-full" rows="3" placeholder="Tell us about your site or challenges" value={form.message} onChange={(e) => update('message', e.target.value)} />
        </div>
      </div>

      <div>
        <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Request a call</button>
      </div>

      {status && <p className="text-sm text-gray-700">{status}</p>}
    </form>
  )
}
