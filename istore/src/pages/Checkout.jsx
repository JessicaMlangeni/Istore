import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectBagItems, selectBagSubtotal, clearBag } from '../store/bagSlice'
import {
  selectAddresses, selectPayments,
  selectSelectedAddr, selectSelectedPay,
  selectAddress, selectPayment, placeOrder,
} from '../store/checkoutSlice'

export default function Checkout() {
  const dispatch   = useDispatch()
  const navigate   = useNavigate()
  const items      = useSelector(selectBagItems)
  const subtotal   = useSelector(selectBagSubtotal)
  const addresses  = useSelector(selectAddresses)
  const payments   = useSelector(selectPayments)
  const selAddr    = useSelector(selectSelectedAddr)
  const selPay     = useSelector(selectSelectedPay)
  const total      = subtotal

  const handlePlaceOrder = () => {
    dispatch(placeOrder())
    dispatch(clearBag())
    navigate('/')
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
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Left: sections */}
        <div style={{ flex: 1, overflow: 'auto', padding: '20px 24px' }}>

          {/* ─ SHIPPING ADDRESS ─ */}
          <section style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: '#111', letterSpacing: 1, textTransform: 'uppercase', margin: 0 }}>
                Shipping Address
              </h4>
              <Link
                to="/add-address"
                style={{ fontSize: 11, color: '#e94560', fontWeight: 600, background: 'none', border: '1px solid #e94560', borderRadius: 4, padding: '2px 10px' }}
              >
                Edit
              </Link>
            </div>

            {addresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => dispatch(selectAddress(addr.id))}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '10px 12px', borderRadius: 8, marginBottom: 8,
                  border: `1.5px solid ${selAddr?.id === addr.id ? '#e94560' : '#f0f0f0'}`,
                  cursor: 'pointer', background: selAddr?.id === addr.id ? '#fff8f9' : '#fff',
                  transition: 'border-color 0.15s',
                }}
              >
                {/* Radio dot */}
                <div style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${selAddr?.id === addr.id ? '#e94560' : '#ddd'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  {selAddr?.id === addr.id && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#e94560' }} />}
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#111', margin: '0 0 2px' }}>{addr.name}</p>
                  <p style={{ fontSize: 11, color: '#888', margin: '0 0 1px', lineHeight: 1.5 }}>{addr.line1}</p>
                  <p style={{ fontSize: 11, color: '#888', margin: '0 0 1px' }}>{addr.line2}</p>
                  <p style={{ fontSize: 11, color: '#888', margin: 0 }}>{addr.phone}</p>
                </div>
              </div>
            ))}
          </section>

          {/* ─ PAYMENT METHOD ─ */}
          <section style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: '#111', letterSpacing: 1, textTransform: 'uppercase', margin: 0 }}>
                Payment Method
              </h4>
              <Link
                to="/add-payment"
                style={{ fontSize: 11, color: '#e94560', fontWeight: 600, border: '1px solid #e94560', borderRadius: 4, padding: '2px 10px' }}
              >
                Edit
              </Link>
            </div>

            {payments.map((pay) => (
              <div
                key={pay.id}
                onClick={() => dispatch(selectPayment(pay.id))}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 8, marginBottom: 8,
                  border: `1.5px solid ${selPay?.id === pay.id ? '#e94560' : '#f0f0f0'}`,
                  cursor: 'pointer', background: selPay?.id === pay.id ? '#fff8f9' : '#fff',
                  transition: 'border-color 0.15s',
                }}
              >
                <div style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${selPay?.id === pay.id ? '#e94560' : '#ddd'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {selPay?.id === pay.id && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#e94560' }} />}
                </div>
                <div style={{ width: 36, height: 22, borderRadius: 3, background: pay.type === 'Visa' ? '#1a1f71' : '#252525', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#fff', fontSize: 8, fontWeight: 800 }}>{pay.type}</span>
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#111', margin: '0 0 1px' }}>{pay.type} •••• {pay.last4}</p>
                  <p style={{ fontSize: 11, color: '#888', margin: 0 }}>Expires {pay.expiry}</p>
                </div>
              </div>
            ))}
          </section>

          {/* ─ REVIEW YOUR BAG ─ */}
          <section>
            <h4 style={{ fontSize: 11, fontWeight: 700, color: '#111', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
              Review Your Bag
            </h4>

            {items.length === 0 ? (
              <p style={{ fontSize: 12, color: '#aaa' }}>No items in bag.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid #f8f8f8' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 6, background: '#f5f5f5', flexShrink: 0, overflow: 'hidden', border: '1px solid #f0f0f0' }}>
                    <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} onError={(e) => { e.target.style.display = 'none' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: '#111', margin: '0 0 1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                    <p style={{ fontSize: 11, color: '#888', margin: 0 }}>{item.brand}</p>
                    <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                      {'★★★★★'.split('').map((_, i) => (
                        <span key={i} style={{ color: i < Math.floor(item.rating) ? '#f59e0b' : '#e0e0e0', fontSize: 10 }}>★</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#111', margin: '0 0 2px' }}>${(item.price * item.qty).toFixed(2)}</p>
                    <p style={{ fontSize: 10, color: '#aaa', margin: 0 }}>x{item.qty}</p>
                  </div>
                </div>
              ))
            )}
          </section>
        </div>

        {/* ── RIGHT ORDER SUMMARY ── */}
        <aside style={{ width: 180, borderLeft: '1px solid #f0f0f0', background: '#fff', padding: 16, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#111', marginBottom: 16 }}>Order Summary</p>

          {[
            [`${items.reduce((a, i) => a + i.qty, 0)} Items`, `$${subtotal.toFixed(2)}`],
            ['Shipping', 'Free'],
            ['Total Cost', `$${total.toFixed(2)}`],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: '#888' }}>{k}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#111' }}>{v}</span>
            </div>
          ))}

          <div style={{ flex: 1 }} />

          <button
            onClick={handlePlaceOrder}
            disabled={items.length === 0 || !selAddr || !selPay}
            style={{
              width: '100%', padding: '9px 0',
              background: (items.length === 0 || !selAddr || !selPay) ? '#ccc' : '#111',
              color: '#fff', border: 'none', borderRadius: 7,
              fontSize: 12, fontWeight: 600,
              cursor: (items.length === 0 || !selAddr || !selPay) ? 'not-allowed' : 'pointer',
            }}
          >
            Place Order
          </button>
        </aside>
      </div>
    </div>
  )
}
