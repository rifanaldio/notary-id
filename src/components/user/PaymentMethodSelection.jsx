import PropTypes from 'prop-types';
import { useState } from 'react';
import { ArrowLeft, Info, Wallet } from 'lucide-react';

const PaymentMethodSelection = ({ totalAmount, onBack, onPay, isCompact = false }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [activeTab, setActiveTab] = useState('e-money');
  const [useHalocoins, setUseHalocoins] = useState(false);
  const [useNotaryIDBalance, setUseNotaryIDBalance] = useState(false);

  // Dummy balance data
  const halocoinsBalance = 0;
  const notaryIDBalance = 0;

  // E-money options
  const eMoneyOptions = [
    {
      id: 'gopay',
      name: 'gopay',
      logo: '💳',
      connected: false,
      message: 'Sambungkan gopay sebagai metode pembayaran.',
      insufficient: false
    },
    {
      id: 'shopeepay',
      name: 'ShopeePay',
      logo: '🛒',
      connected: true,
      insufficient: true,
      balance: 478
    },
    {
      id: 'dana',
      name: 'DANA',
      logo: '💙',
      connected: false,
      message: 'Sambungkan DANA sebagai metode pembayaran.',
      insufficient: false
    },
    {
      id: 'ovo',
      name: 'OVO',
      logo: '💜',
      connected: false,
      message: 'Sambungkan OVO sebagai metode pembayaran.',
      insufficient: false
    },
    {
      id: 'linkaja',
      name: 'LinkAja',
      logo: '🔗',
      connected: false,
      message: 'Sambungkan LinkAja sebagai metode pembayaran.',
      insufficient: false
    },
    {
      id: 'astrapay',
      name: 'AstraPay',
      logo: '🚗',
      connected: true,
      insufficient: false
    }
  ];

  const handlePay = () => {
    if (!selectedPaymentMethod && !useHalocoins && !useNotaryIDBalance) {
      alert('Pilih metode pembayaran terlebih dahulu');
      return;
    }
    onPay({
      paymentMethod: selectedPaymentMethod,
      useHalocoins,
      useNotaryIDBalance,
      totalAmount
    });
  };

  const isPayButtonDisabled = !selectedPaymentMethod && !useHalocoins && !useNotaryIDBalance;

  if (isCompact) {
    return (
      <div className="space-y-4">
        {/* Header - Total Tagihan & Pembayaranmu */}
        <div className="bg-brand-surface dark:bg-brand-dark/50 rounded-xl p-4 border border-brand-muted/20 dark:border-brand-light/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-brand-muted dark:text-brand-light/70">Total Tagihan</span>
            <span className="text-base font-bold text-brand-dark dark:text-brand-light">
              Rp {totalAmount.toLocaleString('id-ID')}
            </span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-brand-muted/20">
            <span className="text-sm font-semibold text-brand-dark dark:text-brand-light">Pembayaranmu</span>
            <span className="text-lg font-bold text-brand-primary">
              Rp {totalAmount.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Balance Options */}
        <div className="bg-brand-surface dark:bg-brand-dark/50 rounded-xl p-4 border border-brand-muted/20 dark:border-brand-light/10 space-y-3">
          {/* Halocoins */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-xl">
                😊
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-dark dark:text-brand-light">halocoins</p>
                <p className="text-xs text-brand-muted dark:text-brand-light/70">
                  Saldo {halocoinsBalance} Koin
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={useHalocoins}
                onChange={(e) => setUseHalocoins(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-brand-muted/40 dark:bg-brand-muted/60 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
            </label>
          </div>

          {/* NotaryID Balance */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Wallet size={20} className="text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-dark dark:text-brand-light">NotaryID</p>
                <p className="text-xs text-brand-muted dark:text-brand-light/70">
                  Saldo Rp{notaryIDBalance.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={useNotaryIDBalance}
                onChange={(e) => setUseNotaryIDBalance(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-brand-muted/40 dark:bg-brand-muted/60 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
            </label>
          </div>
        </div>

        {/* Payment Method Tabs */}
        <div className="bg-brand-surface dark:bg-brand-dark/50 rounded-xl p-4 border border-brand-muted/20 dark:border-brand-light/10">
          <div className="flex gap-4 mb-4 border-b border-brand-muted/20">
            <button
              type="button"
              onClick={() => setActiveTab('e-money')}
              className={`pb-2 px-1 text-sm font-semibold transition ${
                activeTab === 'e-money'
                  ? 'text-brand-primary border-b-2 border-brand-primary'
                  : 'text-brand-muted dark:text-brand-light/60'
              }`}
            >
              Uang Elektronik
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('card')}
              className={`pb-2 px-1 text-sm font-semibold transition ${
                activeTab === 'card'
                  ? 'text-brand-primary border-b-2 border-brand-primary'
                  : 'text-brand-muted dark:text-brand-light/60'
              }`}
            >
              Kartu Kredit/Debit
            </button>
          </div>

          {/* E-Money Options */}
          {activeTab === 'e-money' && (
            <div className="space-y-3">
              {eMoneyOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                    selectedPaymentMethod === option.id
                      ? 'border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/10'
                      : 'border-brand-muted/30 dark:border-brand-light/10 bg-white dark:bg-brand-dark/50 hover:border-brand-primary/50'
                  } ${option.insufficient ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-brand-muted/20 dark:bg-brand-muted/40 flex items-center justify-center text-xl">
                      {option.logo}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-brand-dark dark:text-brand-light">
                        {option.name}
                      </p>
                      {option.insufficient && (
                        <p className="text-xs text-status-danger mt-1">
                          Saldo Tidak Cukup : Rp{option.balance?.toLocaleString('id-ID')}
                        </p>
                      )}
                      {option.message && (
                        <div className="flex items-center gap-1 mt-1">
                          <Info size={12} className="text-status-danger" />
                          <p className="text-xs text-status-danger">{option.message}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={option.id}
                    checked={selectedPaymentMethod === option.id}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    disabled={option.insufficient}
                    className="mt-1 w-4 h-4 text-brand-primary border-brand-muted focus:ring-brand-primary focus:ring-2"
                  />
                </label>
              ))}
            </div>
          )}

          {/* Credit/Debit Card Tab */}
          {activeTab === 'card' && (
            <div className="text-center py-8">
              <p className="text-sm text-brand-muted dark:text-brand-light/70">
                Fitur Kartu Kredit/Debit akan segera hadir
              </p>
            </div>
          )}
        </div>

        {/* Pay Button */}
        <button
          type="button"
          onClick={handlePay}
          disabled={isPayButtonDisabled}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all shadow-md ${
            isPayButtonDisabled
              ? 'bg-brand-muted/30 dark:bg-brand-muted/40 text-brand-muted dark:text-brand-light/50 cursor-not-allowed'
              : 'bg-brand-primary hover:bg-brand-primary/90 active:bg-brand-primary/95 text-white hover:shadow-lg active:scale-[0.98]'
          }`}
        >
          <Wallet size={18} className="fill-white" />
          Bayar
        </button>
      </div>
    );
  }

  // Full version (if needed)
  return (
    <div className="min-h-screen bg-brand-muted/20 dark:bg-brand-dark/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Same content as compact version but with more spacing */}
        {/* ... */}
      </div>
    </div>
  );
};

PaymentMethodSelection.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired,
  onPay: PropTypes.func.isRequired,
  isCompact: PropTypes.bool
};

export default PaymentMethodSelection;
