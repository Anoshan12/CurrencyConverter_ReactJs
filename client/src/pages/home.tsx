import CurrencyConverter from "@/components/CurrencyConverter";
import backgroundImage from "@/assets/background.jpg";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
    
    
    >
      <CurrencyConverter />
    </div>
  );
}
