import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addAddress } from '../store/checkoutSlice'

const FIELD_STYLE = {
  width: '100%', padding: '8px 10px',
  border: '1px solid #e8e8e8', borderRadius: 6,
  fontSize: 12, color: '#333', background: '#fff',
  fontFamily: 'Inter, sans-serif',
}

const LABEL_STYLE = { fontSize: 11, color: '#888', display: 'block', marginBottom: 4 }

const COUNTRIES = [
  'South Africa', 'United States', 'United Kingdom',
  'Germany', 'France', 'Australia', 'Canada',
  'Nigeria', 'Kenya', 'India', 'Brazil',
]

export default function AddAddress() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', phone: '', line1: '', line2: '',
    city: '', state: '', zip: '', country: 'South Africa',
  })
  const [errors, setErrors] = useState({})
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name  = 'Required'
    if (!form.line1.trim()) e.line1 = 'Required'
    if (!form.city.trim())  e.city  = 'Required'
    if (!form.zip.trim())   e.zip   = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    dispatch(addAddress(form))
    navigate('/checkout')
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#fff' }}>

      {/* ── LEFT SIDEBAR ── */}
      <aside style={{ width: 52, background: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 16, flexShrink: 0 }}>
        <div onClick={() => navigate('/')} style={{ width: 28, height: 28, background: '#e94560', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, cursor: 'pointer' }}>
          <span style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>S</span>
        </div>
        {['⊞', '◎', '♡', '⊙'].map((icon) => (
          <div key={icon} style={{ width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#888', fontSize: 16, marginBottom: 4 }}>
            {icon}
          </div>
        ))}
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px 28px' }}>

        {/* Back */}
        <button onClick={() => navigate('/checkout')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: 12, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 4 }}>
          ← Back
        </button>

        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 20 }}>
          Add Address
        </h3>

        {/* Form card */}
        <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 10, padding: '20px', maxWidth: 440 }}>

          {/* Row: Full name */}
          <div style={{ marginBottom: 12 }}>
            <label style={LABEL_STYLE}>Full Name</label>
            <input
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="John Doe"
              style={{ ...FIELD_STYLE, borderColor: errors.name ? '#e94560' : '#e8e8e8' }}
            />
            {errors.name && <p style={{ fontSize: 10, color: '#e94560', margin: '3px 0 0' }}>{errors.name}</p>}
          </div>

          {/* Row: Phone */}
          <div style={{ marginBottom: 12 }}>
            <label style={LABEL_STYLE}>Phone Number</label>
            <input
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              placeholder="(671) 555-0110"
              inputMode="tel"
              style={FIELD_STYLE}
            />
          </div>

          {/* Row: Address line 1 */}
          <div style={{ marginBottom: 12 }}>
            <label style={LABEL_STYLE}>Address Line 1</label>
            <input
              value={form.line1}
              onChange={(e) => set('line1', e.target.value)}
              placeholder="2715 Ash Dr. San Jose"
              style={{ ...FIELD_STYLE, borderColor: errors.line1 ? '#e94560' : '#e8e8e8' }}
            />
            {errors.line1 && <p style={{ fontSize: 10, color: '#e94560', margin: '3px 0 0' }}>{errors.line1}</p>}
          </div>

          {/* Row: Address line 2 */}
          <div style={{ marginBottom: 12 }}>
            <label style={LABEL_STYLE}>Address Line 2</label>
            <input
              value={form.line2}
              onChange={(e) => set('line2', e.target.value)}
              placeholder="South Dakota 83475"
              style={FIELD_STYLE}
            />
          </div>

          {/* Row: City + State */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={LABEL_STYLE}>City</label>
              <input
                value={form.city}
                onChange={(e) => set('city', e.target.value)}
                placeholder="Cape Town"
                style={{ ...FIELD_STYLE, borderColor: errors.city ? '#e94560' : '#e8e8e8' }}
              />
              {errors.city && <p style={{ fontSize: 10, color: '#e94560', margin: '3px 0 0' }}>{errors.city}</p>}
            </div>
            <div style={{ flex: 1 }}>
              <label style={LABEL_STYLE}>State / Province</label>
              <input
                value={form.state}
                onChange={(e) => set('state', e.target.value)}
                placeholder="Western Cape"
                style={FIELD_STYLE}
              />
            </div>
          </div>

          {/* Row: ZIP + Country */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <div style={{ flex: 1 }}>
              <label style={LABEL_STYLE}>ZIP / Postal Code</label>
              <input
                value={form.zip}
                onChange={(e) => set('zip', e.target.value)}
                placeholder="8001"
                inputMode="numeric"
                style={{ ...FIELD_STYLE, borderColor: errors.zip ? '#e94560' : '#e8e8e8' }}
              />
              {errors.zip && <p style={{ fontSize: 10, color: '#e94560', margin: '3px 0 0' }}>{errors.zip}</p>}
            </div>
            <div style={{ flex: 1 }}>
              <label style={LABEL_STYLE}>Country</label>
              <select
                value={form.country}
                onChange={(e) => set('country', e.target.value)}
                style={{ ...FIELD_STYLE, cursor: 'pointer' }}
              >
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Submit row */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleSubmit}
              style={{
                padding: '10px 28px', background: '#111',
                color: '#fff', border: 'none', borderRadius: 7,
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
