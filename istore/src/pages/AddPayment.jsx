import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addPayment, selectPayments, selectPayment } from '../store/checkoutSlice'

const FIELD_STYLE = {
  width: '100%', padding: '8px 10px',
  border: '1px solid #e8e8e8', borderRadius: 6,
  fontSize: 12, color: '#333',
  background: '#fff', fontFamily: 'Inter, sans-serif',
}

export default function AddPayment() {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const payments  = useSelector(selectPayments)

  const [form, setForm] = useState({ type: 'Visa', number: '', name: '', expiry: '', cvv: '' })
  const [errors, setErrors] = useState({})
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const formatNumber = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExpiry = (v) => {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
  }

  const validate = () => {
    const e = {}
    if (form.number.replace(/\s/g, '').length < 16) e.number = 'Enter valid card number'
    if (!form.name.trim()) e.name = 'Name required'
    if (form.expiry.length < 5) e.expiry = 'Enter valid expiry'
    if (form.cvv.length < 3) e.cvv = 'Enter valid CVV'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    dispatch(addPayment({
      type:   form.type,
      last4:  form.number.replace(/\s/g, '').slice(-4),
      expiry: form.expiry,
      name:   form.name,
    }))
    navigate('/checkout')
  }

  const handleSelect = (id) => {
    dispatch(selectPayment(id))
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
      <div style={{ flex: 1, overflow: 'auto', padding: '20px 28px', maxWidth: 480 }}>

        {/* Back */}
        <button onClick={() => navigate('/checkout')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: 12, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 4 }}>
          ← Back
        </button>

        {/* SELECT A CARD */}
        <section style={{ marginBottom: 24 }}>
          <h4 style={{ fontSize: 11, fontWeight: 700, color: '#111', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
            Select a Card
          </h4>

          {payments.map((p) => (
            <div
              key={p.id}
              onClick={() => handleSelect(p.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 8, marginBottom: 8,
                border: '1px solid #f0f0f0', cursor: 'pointer', background: '#fafafa',
                transition: 'border-color 0.15s, background 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#e94560'; e.currentTarget.style.background = '#fff8f9' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.background = '#fafafa' }}
            >
              {/* Card type badge */}
              <div style={{ width: 40, height: 24, borderRadius: 3, background: p.type === 'Visa' ? '#1a1f71' : '#252525', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#fff', fontSize: 8, fontWeight: 800 }}>{p.type}</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#111', margin: '0 0 1px' }}>•••• •••• •••• {p.last4}</p>
                <p style={{ fontSize: 11, color: '#888', margin: 0 }}>{p.name} · Exp {p.expiry}</p>
              </div>
              <span style={{ fontSize: 10, color: '#e94560', fontWeight: 600 }}>Select →</span>
            </div>
          ))}
        </section>

        {/* ADD A NEW CARD */}
        <section>
          <h4 style={{ fontSize: 11, fontWeight: 700, color: '#111', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
            Add a New Card
          </h4>

          {/* Card type tabs */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            {['Visa', 'Mastercard', 'Amex'].map((t) => (
              <button
                key={t}
                onClick={() => set('type', t)}
                style={{
                  padding: '5px 14px', borderRadius: 5, border: `1px solid ${form.type === t ? '#e94560' : '#e8e8e8'}`,
                  background: form.type === t ? '#fff8f9' : '#fff',
                  color: form.type === t ? '#e94560' : '#888',
                  fontSize: 11, fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Card number */}
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 11, color: '#888', display: 'block', marginBottom: 4 }}>Card Number</label>
            <input
              value={form.number}
              onChange={(e) => set('number', formatNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              inputMode="numeric"
              style={{ ...FIELD_STYLE, borderColor: errors.number ? '#e94560' : '#e8e8e8' }}
            />
            {errors.number && <p style={{ fontSize: 10, color: '#e94560', margin: '3px 0 0' }}>{errors.number}</p>}
          </div>

          {/* Cardholder name */}
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 11, color: '#888', display: 'block', marginBottom: 4 }}>Cardholder Name</label>
            <input
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="John Doe"
              style={{ ...FIELD_STYLE, borderColor: errors.name ? '#e94560' : '#e8e8e8' }}
            />
            {errors.name && <p style={{ fontSize: 10, color: '#e94560', margin: '3px 0 0' }}>{errors.name}</p>}
          </div>

          {/* Expiry + CVV row */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: '#888', display: 'block', marginBottom: 4 }}>Expiry Date</label>
              <input
                value={form.expiry}
                onChange={(e) => set('expiry', formatExpiry(e.target.value))}
                placeholder="MM/YY"
                inputMode="numeric"
                style={{ ...FIELD_STYLE, borderColor: errors.expiry ? '#e94560' : '#e8e8e8' }}
              />
              {errors.expiry && <p style={{ fontSize: 10, color: '#e94560', margin: '3px 0 0' }}>{errors.expiry}</p>}
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: '#888', display: 'block', marginBottom: 4 }}>CVV</label>
              <input
                value={form.cvv}
                onChange={(e) => set('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="•••"
                type="password"
                inputMode="numeric"
                style={{ ...FIELD_STYLE, borderColor: errors.cvv ? '#e94560' : '#e8e8e8' }}
              />
              {errors.cvv && <p style={{ fontSize: 10, color: '#e94560', margin: '3px 0 0' }}>{errors.cvv}</p>}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            style={{
              width: '100%', padding: '10px 0', background: '#111',
              color: '#fff', border: 'none', borderRadius: 7,
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Continue
          </button>
        </section>
      </div>
    </div>
  )
}
