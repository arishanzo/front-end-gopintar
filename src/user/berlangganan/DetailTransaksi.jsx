const DetailTransaksi = (props) => {
    
    const result = props.result;

    return (
        <div class="bg-gray-50 p-8 border-l border-gray-200 space-y-4">
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-bold mb-2">Detail Pembayaran</h3>

          {/* Virtual Account */}
          {result.payment_type === "bank_transfer" && result.va_numbers && (
            <>
              <p>Bank: {result.va_numbers[0].bank.toUpperCase()}</p>
              <p>No VA: {result.va_numbers[0].va_number}</p>
              <p>Jumlah: Rp {result.gross_amount}</p>
              <p>Status: {result.transaction_status}</p>
            </>
          )}

          {/* QRIS */}
          {result.payment_type === "qris" && result.actions && (
            <>
              <p>Scan QR Code untuk bayar:</p>
              <img src={result.actions[0].url} alt="QRIS Code" />
              <p>Jumlah: Rp {result.gross_amount}</p>
            </>
          )}

          {/* E-wallet */}
          {(result.payment_type === "gopay" || result.payment_type === "shopeepay") && result.actions && (
            <>
              <p>Bayar dengan {result.payment_type.toUpperCase()}</p>
              <a
                href={result.actions[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Klik di sini untuk lanjut ke {result.payment_type}
              </a>
            </>
          )}

          {/* Retail (cstore) */}
          {result.payment_type === "cstore" && (
            <>
              <p>Kode Pembayaran: {result.payment_code}</p>
              <p>Store: {result.store}</p>
              <p>Jumlah: Rp {result.gross_amount}</p>
            </>
          )}

          {/* Credit Card */}
          {result.payment_type === "credit_card" && result.redirect_url && (
            <>
              <p>Bayar dengan Credit Card</p>
              <a
                href={result.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Klik di sini untuk 3D Secure
              </a>
            </>
          )}
        </div>
        </div>
    )
}

export default DetailTransaksi;