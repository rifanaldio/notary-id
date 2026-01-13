import PropTypes from 'prop-types';
import { useState } from 'react';
import { Stethoscope, MessageCircle, Mail, Phone } from 'lucide-react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { login } from '../../store/authSlice';
import Modal from '../common/Modal';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const dispatch = useAppDispatch();
  const [phoneNumber, setPhoneNumber] = useState('81511239931');
  const [countryCode, setCountryCode] = useState('+62');

  const handleLogin = () => {
    // Auto login dummy - langsung login dengan data user
    const dummyUser = {
      id: 'user_001',
      phone: `${countryCode}${phoneNumber}`,
      name: `User ${phoneNumber}`,
      email: `user${phoneNumber}@notary.id`,
      loginMethod: 'whatsapp' // atau 'sms'
    };
    
    dispatch(login(dummyUser));
    
    // Call onLoginSuccess callback jika ada
    if (onLoginSuccess) {
      onLoginSuccess();
    } else {
      onClose();
    }
  };

  const handleWhatsAppLogin = () => {
    handleLogin();
  };

  const handleSMSLogin = () => {
    handleLogin();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center">
                <Stethoscope size={32} className="text-brand-primary" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-brand-dark dark:text-brand-light text-center mb-2">
              Masukkan Nomor Ponsel
            </h2>

            {/* Instruction */}
            <p className="text-sm text-brand-muted dark:text-brand-light/70 text-center mb-6">
              Masukkan nomor ponsel untuk masuk ke NotaryID atau membuat akun baru.
            </p>

            {/* Phone Number Input */}
            <div className="mb-4">
              <div className="flex gap-2">
                {/* Country Code Dropdown */}
                <div className="relative">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="appearance-none bg-brand-surface dark:bg-brand-dark border border-brand-muted/40 dark:border-brand-light/20 rounded-xl px-4 py-3 pr-10 text-brand-dark dark:text-brand-light font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                  >
                    <option value="+62">🇮🇩 +62</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Phone size={16} className="text-brand-muted" />
                  </div>
                </div>

                {/* Phone Number Input */}
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="Masukkan nomor ponsel"
                  className="flex-1 bg-brand-surface dark:bg-brand-dark border border-brand-muted/40 dark:border-brand-light/20 rounded-xl px-4 py-3 text-brand-dark dark:text-brand-light placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                />
              </div>

              {/* Change Number Link */}
              <button
                type="button"
                onClick={() => setPhoneNumber('')}
                className="mt-2 text-xs text-brand-primary hover:opacity-80 transition"
              >
                Salah nomor? Ganti Nomor Ponsel
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              {/* WhatsApp Button */}
              <button
                type="button"
                onClick={handleWhatsAppLogin}
                className="w-full flex items-center justify-center gap-3 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                <MessageCircle size={20} className="fill-white" />
                Kirim Kode melalui WhatsApp
              </button>

              {/* SMS Button */}
              <button
                type="button"
                onClick={handleSMSLogin}
                className="w-full flex items-center justify-center gap-3 bg-white dark:bg-brand-dark border-2 border-brand-primary text-brand-primary font-semibold py-3.5 px-4 rounded-xl transition-all hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 active:scale-[0.98]"
              >
                <Mail size={20} />
                Kirim Kode melalui SMS
              </button>
            </div>

            {/* Terms and Conditions */}
            <p className="text-xs text-brand-muted dark:text-brand-light/60 text-center leading-relaxed">
              Dengan masuk atau mendaftar, saya menyetujui{' '}
              <a href="#" className="text-brand-primary hover:underline">
                Ketentuan Penggunaan NotaryID
              </a>{' '}
              dan{' '}
              <a href="#" className="text-brand-primary hover:underline">
                Kebijakan Privasi NotaryID
              </a>
      </p>
    </Modal>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func
};

export default LoginModal;
