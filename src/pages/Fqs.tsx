import { useState } from 'react';

export default function FAQAndInfo() {
  const [selectedFAQ, setSelectedFAQ] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const faqs = [
    {
      question: 'What do I need to rent a car?',
      answer: (
        <ul className="list-disc pl-4">
          <li>Your voucher / eVoucher, to show that you’ve paid for the car.</li>
          <li>The main driver’s credit / debit card, with enough available funds for the car’s deposit.</li>
          <li>Each driver’s full, valid driving licence, which they’ve held for at least 12 months (often 24).</li>
          <li>Your passport and any other ID the car hire company needs to see.</li>
        </ul>
      )
    },
    {
      question: 'How old do I have to be to rent a car?',
      answer: 'For most car rental companies, the age requirement is between 21 and 70 years old. If you’re under 25 or over 70, you might have to pay an additional fee.'
    },
    {
      question: 'Can I book a rental car for someone else?',
      answer: 'Yes, as long as they meet these requirements. Just fill in their details while you’re making the reservation.'
    },
    {
      question: 'How do I find the cheapest car rental deal?',
      answer: 'We work with all the major international car hire brands (and lots of smaller local companies) to bring you a huge choice of cars at the very best prices. That’s how we can find you cheap car hire deals at over 60,000 locations worldwide. To compare prices and find your ideal car at an unbeatable price, just use our search form.'
    }
  ];

  const popularCities = [
    {
      name: 'Nairobi',
      info: 'Nairobi is the capital and largest city of Kenya. It is known as the "Green City in the Sun" and serves as the political, financial, and cultural center of Kenya. Highlights: Nairobi National Park, Giraffe Centre, David Sheldrick Wildlife Trust, Karen Blixen Museum, vibrant nightlife, and various international restaurants.'
    },
    {
      name: 'Mombasa',
      info: 'Mombasa is a coastal city in southeastern Kenya along the Indian Ocean. It is Kenya\'s oldest and second-largest city and an important regional tourism center. Highlights: Beautiful beaches, Fort Jesus, Old Town, Haller Park, and Mombasa Marine National Park.'
    },
    {
      name: 'Kisumu',
      info: 'Kisumu is the third-largest city in Kenya, located on the shores of Lake Victoria. It is an important port city and a key economic hub in western Kenya. Highlights: Kisumu Impala Sanctuary, Dunga Beach, Kisumu Museum, and the nearby Kit Mikayi rock formation.'
    },
    {
      name: 'Nakuru',
      info: 'Nakuru is a city in the Rift Valley region of Kenya. It is known for its agricultural activities and as a gateway to several national parks. Highlights: Lake Nakuru National Park, Menengai Crater, Hyrax Hill Prehistoric Site, and the Lord Egerton Castle.'
    },
    {
      name: 'Eldoret',
      info: 'Eldoret is a principal city in western Kenya and is one of the fastest-growing towns in the country. It is known for its agriculture and as a center for Kenyan athletics. Highlights: Eldoret Sports Club, Rift Valley Technical Training Institute, and various agricultural tours.'
    },
    {
      name: 'Thika',
      info: 'Thika is an industrial town located in central Kenya, northeast of Nairobi. It is known for its pineapple plantations and various industries. Highlights: Fourteen Falls, Chania Falls, and Thika World War Memorial Park.'
    },
    {
      name: 'Kitale',
      info: 'Kitale is a town in western Kenya known for its rich agricultural activities and scenic landscapes. Highlights: Saiwa Swamp National Park, Kitale Museum, and Mount Elgon National Park.'
    },
    {
      name: 'Machakos',
      info: 'Machakos is a town in southeastern Kenya known for its trade and as an administrative center. It is also known as Masaku. Highlights: Machakos People\'s Park, Iveti Hills, and the nearby Mua Hills.'
    },
    {
      name: 'Malindi',
      info: 'Malindi is a coastal town in southeastern Kenya along the Indian Ocean. It is known for its historical sites and beautiful beaches. Highlights: Malindi Marine National Park, Vasco da Gama Pillar, and the Malindi Museum.'
    },
    {
      name: 'Naivasha',
      info: 'Naivasha is a market town in Nakuru County, situated on the shores of Lake Naivasha in the Great Rift Valley. Highlights: Lake Naivasha, Hell\'s Gate National Park, and Crescent Island Game Park.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setSelectedFAQ(selectedFAQ === index ? null : index);
  };

  const toggleCity = (index: number) => {
    setSelectedCity(selectedCity === index ? null : index);
  };

  const filteredCities = popularCities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-wrap justify-between p-4">
      <div className="w-full md:w-2/3 p-4">
        <h2 className="text-2xl font-bold text-blue-600">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="mt-4">
            <h3
              className={`font-semibold text-lg cursor-pointer ${selectedFAQ === index ? 'text-indigo-600' : 'text-gray-900'}`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </h3>
            {selectedFAQ === index && (
              <div className="mt-2 p-4 bg-gray-100 rounded-lg">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full md:w-1/3 p-4">
        <h2 className="text-2xl font-bold text-blue-600">Additional Information</h2>
        <div className="mt-4">
          <h3 className="font-semibold text-lg text-gray-900">Popular Cities in Kenya</h3>
          <input
            type="text"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-2 mb-4 p-2 border rounded w-full"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCities.map((city, index) => (
              <div
                key={index}
                className={`cursor-pointer p-4 border rounded-lg shadow-sm transition-transform transform ${selectedCity === index ? 'bg-indigo-100 scale-105' : 'bg-white'}`}
                onClick={() => toggleCity(index)}
              >
                <h4 className={`font-semibold text-lg ${selectedCity === index ? 'text-indigo-600' : 'text-gray-900'}`}>
                  {city.name}
                </h4>
                {selectedCity === index && (
                  <div className="mt-2 text-gray-700">
                    <p>{city.info}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
