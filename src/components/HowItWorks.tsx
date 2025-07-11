import ScrollToggleSection from "./ScrollToggleSection";

export default function HowItWorks() {
  const steps = [
    {
      title: "Buying",
      content: `• Deposit BTC/ETH/BNB → auto-swapped to USDC via Paxos or similar
• USDC sent to broker to purchase stock
• NFT issued to your wallet as proof of stock ownership`,
      imageUrl: "/mechanism1.svg"
    },
    {
      title: "Selling",
      content: `• Burn NFT → triggers broker-side sell
• Receive USDC → swap back to BTC/ETH/BNB if desired`,
      imageUrl: "/mechanism2.svg"
    },
    {
      title: "Dividends",
      content: `• Auto-distributed as USDC
• Optional ETH/BNB conversion for DeFi farming`,
      imageUrl: "/mechanism3.svg"
    }
  ];

  return (
    <section id="how-it-works" className="relative">
      <ScrollToggleSection 
        items={steps}
       
        scrollSnap={true}
        className="bg-white"
      />
    </section>
  );
} 