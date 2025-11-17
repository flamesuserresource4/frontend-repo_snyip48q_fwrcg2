export default function Benefits({ selected }) {
  const mapping = {
    "Frequent breakdowns during peak heat": "Scheduled inspections catch issues early, reducing emergency failures when demand peaks.",
    "Inconsistent cooling and hot/cold spots": "Airflow balancing and static pressure checks restore even cooling across zones.",
    "High electricity bills": "Coil cleaning, correct charge verification, and belt/drive optimization improve efficiency.",
    "Poor air quality, dust and allergens": "Filter management and coil sanitation improve IAQ and reduce allergens.",
    "Water leaks or drain line clogs": "Routine drain flushing and pan inspection prevent overflows and water damage.",
    "Unpleasant odors when the unit starts": "Disinfecting coils and pans addresses microbial growth that causes odors.",
    "Noisy operation or vibrations": "Fan and motor alignment checks reduce vibration and noise.",
    "Short equipment lifespan due to poor maintenance": "Component inspections and timely replacements extend equipment life.",
    "Unexpected repair costs and downtime": "Predictive checks and documentation minimize surprises and planable upkeep.",
    "Thermostat inaccuracies and comfort issues": "Calibration and control verification keep setpoints accurate.",
    "Slow response from service providers": "Guaranteed response windows and clear communication SLAs.",
    "Lack of maintenance records for compliance/warranty": "Digital service logs protect warranties and support audits.",
  }

  const chosen = selected && selected.length ? selected : Object.keys(mapping)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">How our service helps</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        {chosen.map((p) => (
          <li key={p}><span className="font-medium text-gray-900">{p}:</span> {mapping[p]}</li>
        ))}
      </ul>
    </div>
  )
}
