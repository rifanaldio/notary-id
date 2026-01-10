import PropTypes from 'prop-types';
import { useState } from 'react';
import { Building2, CheckCircle, Info, X } from 'lucide-react';

const PaymentConfirmation = ({ notary, user, onBack, onConfirm, isCompact = false }) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Pricing
  const sessionFee = 28000; // Biaya sesi 30 menit
  const serviceFee = 2000; // Biaya layanan
  const defaultDiscount = 3000; // Default diskon (DISKONDOKTER)
  
  // Promo codes (dummy)
  const availablePromos = {
    'DISKONDOKTER': 3000,
    'PROMO50': 5000,
    'NEWUSER': 2000
  };

  const handleApplyPromo = () => {
    const promo = availablePromos[promoCode.toUpperCase()];
    if (promo) {
      setAppliedPromo({
        code: promoCode.toUpperCase(),
        discount: promo
      });
    } else {
      alert('Kode promo tidak valid');
    }
  };

  const discount = appliedPromo ? appliedPromo.discount : defaultDiscount;
  const total = sessionFee + serviceFee - discount;

  if (isCompact) {
    // Compact version untuk ditampilkan di dalam card
    return (
      <div className="space-y-4">
        {/* Patient Name Section */}
        <div className="flex items-center justify-between bg-brand-surface dark:bg-brand-dark/50 rounded-xl p-4 border border-brand-muted/20 dark:border-brand-light/10">
          <div>
            <span className="text-sm text-brand-muted dark:text-brand-light/70">Nama Pasien:</span>
            <p className="text-base font-semibold text-brand-dark dark:text-brand-light mt-1">
              {user?.name || 'User'}
            </p>
          </div>
          <button
            type="button"
            className="text-sm text-brand-primary hover:opacity-80 transition font-medium"
          >
            Ganti
          </button>
        </div>

        {/* Notary Card */}
        <div className="bg-brand-surface dark:bg-brand-dark/50 rounded-xl p-4 border border-brand-muted/20 dark:border-brand-light/10">
          <div className="flex items-center gap-4">
            {/* Profile Picture */}
            <div className="flex-shrink-0 relative">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-primary/40 dark:from-brand-primary/30 dark:to-brand-primary/50 flex items-center justify-center overflow-hidden shadow-sm">
                <Building2 size={40} className="text-brand-primary" />
              </div>
              {notary.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center border-2 border-white dark:border-brand-dark shadow-sm">
                  <CheckCircle size={14} className="text-white fill-white" />
                </div>
              )}
            </div>
            
            {/* Name and Specialty */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-brand-dark dark:text-brand-light mb-1">
                {notary.name}
              </h3>
              <p className="text-sm text-brand-primary font-medium">
                {notary.categories[0] || 'Notaris'}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="bg-brand-surface dark:bg-brand-dark/50 rounded-xl p-4 border border-brand-muted/20 dark:border-brand-light/10">
          <h3 className="text-base font-bold text-brand-dark dark:text-brand-light mb-3">
            Detail Pembayaran
          </h3>
          
          <div className="space-y-3 mb-4">
            {/* Session Fee */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-brand-muted dark:text-brand-light/70">
                Biaya sesi 30 menit
              </span>
              <span className="text-sm font-semibold text-brand-dark dark:text-brand-light">
                Rp {sessionFee.toLocaleString('id-ID')}
              </span>
            </div>

            {/* Service Fee */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-brand-muted dark:text-brand-light/70">
                  Biaya Layanan
                </span>
                <div className="relative group">
                  <Info size={14} className="text-brand-muted dark:text-brand-light/60 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 px-3 py-2 bg-brand-dark dark:bg-brand-light text-white dark:text-brand-dark text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    Biaya layanan platform NotaryID
                  </div>
                </div>
              </div>
              <span className="text-sm font-semibold text-brand-dark dark:text-brand-light">
                Rp {serviceFee.toLocaleString('id-ID')}
              </span>
            </div>

            {/* Discount */}
            <div className="flex items-center justify-between pt-2 border-t border-brand-muted/20">
              <div className="flex items-center gap-2">
                <span className="text-sm text-brand-muted dark:text-brand-light/70">
                  Kupon ({appliedPromo ? appliedPromo.code : 'DISKONDOKTER'})
                </span>
                {appliedPromo && (
                  <button
                    type="button"
                    onClick={() => {
                      setAppliedPromo(null);
                      setPromoCode('');
                    }}
                    className="text-xs text-status-danger hover:opacity-80"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
              <span className="text-sm font-semibold text-status-success">
                -Rp {discount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="pt-4 border-t-2 border-brand-muted/30 dark:border-brand-light/20">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-brand-dark dark:text-brand-light">
                Pembayaranmu
              </span>
              <span className="text-xl font-bold text-brand-primary">
                Rp {total.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Promo Code Input */}
        <div className="bg-brand-surface dark:bg-brand-dark/50 rounded-xl p-4 border border-brand-muted/20 dark:border-brand-light/10">
          <h3 className="text-base font-bold text-brand-dark dark:text-brand-light mb-3">
            Punya Kode Promo?
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Masukkan kode promo"
              className="flex-1 bg-brand-surface dark:bg-brand-dark border border-brand-muted/40 dark:border-brand-light/20 rounded-xl px-4 py-3 text-brand-dark dark:text-brand-light placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              disabled={!!appliedPromo}
            />
            <button
              type="button"
              onClick={handleApplyPromo}
              disabled={!promoCode || !!appliedPromo}
              className="px-4 py-2 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:bg-brand-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Terapkan
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-4 py-2.5 rounded-xl bg-brand-muted/20 dark:bg-brand-muted/30 text-brand-dark dark:text-brand-light font-semibold text-sm hover:bg-brand-muted/30 dark:hover:bg-brand-muted/40 transition"
          >
            Kembali
          </button>
          <button
            type="button"
            onClick={() => onConfirm({ notary, total, sessionFee, serviceFee, discount })}
            className="flex-1 px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            Konfirmasi
          </button>
        </div>
      </div>
    );
  }

  // Full version (original)
  return (
    <div className="min-h-screen bg-brand-muted/20 dark:bg-brand-dark/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Patient Name Section */}
        <div className="flex items-center justify-between bg-white dark:bg-brand-dark rounded-xl p-4 border border-brand-muted/20 dark:border-brand-light/10">
          <div>
            <span className="text-sm text-brand-muted dark:text-brand-light/70">Nama Pasien:</span>
            <p className="text-base font-semibold text-brand-dark dark:text-brand-light mt-1">
              {user?.name || 'User'}
            </p>
          </div>
          <button
            type="button"
            className="text-sm text-brand-primary hover:opacity-80 transition font-medium"
          >
            Ganti
          </button>
        </div>

        {/* Notary Card */}
        <div className="bg-white dark:bg-brand-dark rounded-xl p-6 border border-brand-muted/20 dark:border-brand-light/10">
          <div className="flex items-center gap-4">
            {/* Profile Picture */}
            <div className="flex-shrink-0 relative">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-primary/40 dark:from-brand-primary/30 dark:to-brand-primary/50 flex items-center justify-center overflow-hidden shadow-sm">
                <Building2 size={40} className="text-brand-primary" />
              </div>
              {notary.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center border-2 border-white dark:border-brand-dark shadow-sm">
                  <CheckCircle size={14} className="text-white fill-white" />
                </div>
              )}
            </div>
            
            {/* Name and Specialty */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-brand-dark dark:text-brand-light mb-1">
                {notary.name}
              </h3>
              <p className="text-sm text-brand-primary font-medium">
                {notary.categories[0] || 'Notaris'}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="bg-white dark:bg-brand-dark rounded-xl p-6 border border-brand-muted/20 dark:border-brand-light/10">
          <h3 className="text-lg font-bold text-brand-dark dark:text-brand-light mb-4">
            Detail Pembayaran
          </h3>
          
          <div className="space-y-3 mb-4">
            {/* Session Fee */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-brand-muted dark:text-brand-light/70">
                Biaya sesi 30 menit
              </span>
              <span className="text-sm font-semibold text-brand-dark dark:text-brand-light">
                Rp {sessionFee.toLocaleString('id-ID')}
              </span>
            </div>

            {/* Service Fee */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-brand-muted dark:text-brand-light/70">
                  Biaya Layanan
                </span>
                <div className="relative group">
                  <Info size={14} className="text-brand-muted dark:text-brand-light/60 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 px-3 py-2 bg-brand-dark dark:bg-brand-light text-white dark:text-brand-dark text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    Biaya layanan platform NotaryID
                  </div>
                </div>
              </div>
              <span className="text-sm font-semibold text-brand-dark dark:text-brand-light">
                Rp {serviceFee.toLocaleString('id-ID')}
              </span>
            </div>

            {/* Discount */}
            <div className="flex items-center justify-between pt-2 border-t border-brand-muted/20">
              <div className="flex items-center gap-2">
                <span className="text-sm text-brand-muted dark:text-brand-light/70">
                  Kupon ({appliedPromo ? appliedPromo.code : 'DISKONDOKTER'})
                </span>
                {appliedPromo && (
                  <button
                    type="button"
                    onClick={() => {
                      setAppliedPromo(null);
                      setPromoCode('');
                    }}
                    className="text-xs text-status-danger hover:opacity-80"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
              <span className="text-sm font-semibold text-status-success">
                -Rp {discount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="pt-4 border-t-2 border-brand-muted/30 dark:border-brand-light/20">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-brand-dark dark:text-brand-light">
                Pembayaranmu
              </span>
              <span className="text-xl font-bold text-brand-primary">
                Rp {total.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Promo Code Input */}
        <div className="bg-white dark:bg-brand-dark rounded-xl p-6 border border-brand-muted/20 dark:border-brand-light/10">
          <div className="flex gap-3">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Masukkan kode promo"
              className="flex-1 bg-brand-surface dark:bg-brand-dark border border-brand-muted/40 dark:border-brand-light/20 rounded-xl px-4 py-3 text-brand-dark dark:text-brand-light placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              disabled={!!appliedPromo}
            />
            <button
              type="button"
              onClick={handleApplyPromo}
              disabled={!promoCode || !!appliedPromo}
              className="px-6 py-3 rounded-xl bg-brand-muted/30 dark:bg-brand-muted/40 text-brand-dark dark:text-brand-light font-semibold text-sm hover:bg-brand-muted/40 dark:hover:bg-brand-muted/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Terapkan
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-3 rounded-xl bg-brand-muted/20 dark:bg-brand-muted/30 text-brand-dark dark:text-brand-light font-semibold hover:bg-brand-muted/30 dark:hover:bg-brand-muted/40 transition"
          >
            Kembali
          </button>
          <button
            type="button"
            onClick={() => onConfirm({ notary, total, sessionFee, serviceFee, discount })}
            className="flex-1 px-6 py-4 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-base transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
};

PaymentConfirmation.propTypes = {
  notary: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    verified: PropTypes.bool.isRequired
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string
  }),
  onBack: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isCompact: PropTypes.bool
};

export default PaymentConfirmation;
