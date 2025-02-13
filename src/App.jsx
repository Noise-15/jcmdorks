import React, { useState, useEffect } from 'react';

function App() {
  const [productName, setProductName] = useState('');
  const [paymentGateways, setPaymentGateways] = useState(['Cielo', 'PagSeguro']);
  const [customGateway, setCustomGateway] = useState('');
  const [domainRestrictions, setDomainRestrictions] = useState(['.br', '.com']);
  const [customKeywords, setCustomKeywords] = useState('');
  const [generatedDork, setGeneratedDork] = useState('');
  const [estimatedResults, setEstimatedResults] = useState('');

  const predefinedPaymentGateways = ['Cielo', 'PagSeguro', 'Pagarme', 'Zoop', 'Ebanx', 'Erede', 'Safrapay', 'Braspag', 'Getnet', 'Adyen', 'Iugu', 'Assas'];

  const generateDork = async () => {
    let baseDork = `("${productName}") (site:${domainRestrictions.join(' OR site:')})`;
    let gatewayString = paymentGateways.map(gateway => `"${gateway}"`).join(' OR ');
    if (customGateway) {
      gatewayString += ` OR "${customGateway}"`;
    }
    baseDork += ` (${gatewayString})`;
    if (customKeywords) {
      baseDork += ` ${customKeywords}`;
    }

    // Placeholder for Gemini API integration
    const optimizedDork = await optimizeDorkWithGemini(baseDork);
    setGeneratedDork(optimizedDork);

    // Placeholder for result verification
    setEstimatedResults('1,250,000 (simulated)');
  };

  const optimizeDorkWithGemini = async (dork) => {
    // Replace with actual Gemini API call
    // const apiKey = 'AIzaSyBBxiNMCu22aZsHxqiIpdkT4qa4TVadAs4';
    // const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    // const prompt = `You are an expert in crafting precise Google dorks for targeted searches. Your task is to refine the following dork for maximum accuracy and relevance:\n\n${dork}\n\nReturn the optimized dork in plain text format ready for use.`;

    // const response = await fetch(apiUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     prompt: prompt,
    //   }),
    // });

    // const data = await response.json();
    // return data.candidates[0].content.parts[0].text;
    console.warn('Gemini API integration is a placeholder. Replace with actual API call.');
    return dork + ' AND intext:"comprar" AND "pagamento seguro"'; // Returning a mock optimized dork
  };

  const addPaymentGateway = () => {
    if (customGateway && !paymentGateways.includes(customGateway)) {
      setPaymentGateways([...paymentGateways, customGateway]);
      setCustomGateway('');
    }
  };

  const removePaymentGateway = (gatewayToRemove) => {
    setPaymentGateways(paymentGateways.filter(gateway => gateway !== gatewayToRemove));
  };

  return (
    <div>
      <h1>JCM GROUP DORK GENERATOR</h1>

      <label htmlFor="productName">Product Name:</label>
      <input
        type="text"
        id="productName"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <label>Payment Gateways:</label>
      <div>
        {predefinedPaymentGateways.map(gateway => (
          <label key={gateway}>
            <input
              type="checkbox"
              value={gateway}
              checked={paymentGateways.includes(gateway)}
              onChange={(e) => {
                if (e.target.checked) {
                  setPaymentGateways([...paymentGateways, gateway]);
                } else {
                  removePaymentGateway(gateway);
                }
              }}
            />
            {gateway}
          </label>
        ))}
        <div>
          <input
            type="text"
            placeholder="Custom Gateway"
            value={customGateway}
            onChange={(e) => setCustomGateway(e.target.value)}
          />
          <button type="button" onClick={addPaymentGateway}>
            Add Gateway
          </button>
        </div>
      </div>

      <label>Domain Restrictions:</label>
      <div>
        <label>
          <input
            type="checkbox"
            value=".br"
            checked={domainRestrictions.includes('.br')}
            onChange={(e) => {
              if (e.target.checked) {
                setDomainRestrictions([...domainRestrictions, '.br']);
              } else {
                setDomainRestrictions(domainRestrictions.filter(domain => domain !== '.br'));
              }
            }}
          />
          .br
        </label>
        <label>
          <input
            type="checkbox"
            value=".com"
            checked={domainRestrictions.includes('.com')}
            onChange={(e) => {
              if (e.target.checked) {
                setDomainRestrictions([...domainRestrictions, '.com']);
              } else {
                setDomainRestrictions(domainRestrictions.filter(domain => domain !== '.com'));
              }
            }}
          />
          .com
        </label>
      </div>

      <label htmlFor="customKeywords">Custom Keywords:</label>
      <textarea
        id="customKeywords"
        value={customKeywords}
        onChange={(e) => setCustomKeywords(e.target.value)}
        placeholder="e.g., frete grátis, parcelamento"
      />

      <button onClick={generateDork}>Generate Dork</button>

      <div className="output-section">
        <h2>Generated Dork:</h2>
        <p>{generatedDork}</p>
        <button onClick={() => {
          window.open(`https://www.google.com/search?q=${encodeURIComponent(generatedDork)}`, '_blank');
        }}>Test in New Tab</button>
        <button onClick={() => {
          navigator.clipboard.writeText(generatedDork);
          alert('Dork copied to clipboard!');
        }}>Copy</button>
        <p>Estimated Results: {estimatedResults}</p>
      </div>
    </div>
  );
}

export default App;
