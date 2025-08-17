import { useState } from 'react';

const Pengaturan = () => {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        marketingEmails: false,
        language: 'id',
        timezone: 'Asia/Jakarta',
        theme: 'light'
    });

    const handleToggle = (setting) => {
        setSettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    const handleSelectChange = (e) => {
        setSettings(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSave = () => {
        console.log('Saving settings:', settings);
    };

    return (
        <div className="w-full mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Pengaturan</h2>
            
            {/* Notifikasi */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifikasi</h3>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-700">Email Notifikasi</h4>
                            <p className="text-sm text-gray-500">Terima notifikasi melalui email</p>
                        </div>
                        <button
                            onClick={() => handleToggle('emailNotifications')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                settings.emailNotifications ? 'bg-green-600' : 'bg-gray-200'
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-700">SMS Notifikasi</h4>
                            <p className="text-sm text-gray-500">Terima notifikasi melalui SMS</p>
                        </div>
                        <button
                            onClick={() => handleToggle('smsNotifications')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                settings.smsNotifications ? 'bg-green-600' : 'bg-gray-200'
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    settings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-700">Push Notifikasi</h4>
                            <p className="text-sm text-gray-500">Terima notifikasi push di browser</p>
                        </div>
                        <button
                            onClick={() => handleToggle('pushNotifications')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                settings.pushNotifications ? 'bg-green-600' : 'bg-gray-200'
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-700">Email Marketing</h4>
                            <p className="text-sm text-gray-500">Terima email promosi dan penawaran</p>
                        </div>
                        <button
                            onClick={() => handleToggle('marketingEmails')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                settings.marketingEmails ? 'bg-green-600' : 'bg-gray-200'
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    settings.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Preferensi */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferensi</h3>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bahasa
                        </label>
                        <select
                            name="language"
                            value={settings.language}
                            onChange={handleSelectChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="id">Bahasa Indonesia</option>
                            <option value="en">English</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Zona Waktu
                        </label>
                        <select
                            name="timezone"
                            value={settings.timezone}
                            onChange={handleSelectChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="Asia/Jakarta">WIB (Jakarta)</option>
                            <option value="Asia/Makassar">WITA (Makassar)</option>
                            <option value="Asia/Jayapura">WIT (Jayapura)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tema
                        </label>
                        <select
                            name="theme"
                            value={settings.theme}
                            onChange={handleSelectChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="light">Terang</option>
                            <option value="dark">Gelap</option>
                            <option value="auto">Otomatis</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Tombol Simpan */}
            <button
                onClick={handleSave}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                Simpan Pengaturan
            </button>
        </div>
    );
}

export default Pengaturan;