export default function About() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">About Us</h2>

        <section className="mb-12">
          <h3 className="text-3xl font-semibold mb-6 text-gray-800">Our Mission</h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our mission is to provide a seamless and enjoyable vehicle rental experience, offering a diverse selection of vehicles to meet the needs and preferences of all our customers.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-semibold mb-6 text-gray-800">Our Values</h3>
          <ul className="list-disc list-inside text-lg text-gray-600 space-y-2">
            <li>Customer Satisfaction: We prioritize our customers' needs and strive to exceed their expectations.</li>
            <li>Quality: We maintain high standards for our vehicles and services.</li>
            <li>Reliability: We ensure that our vehicles are well-maintained and available when you need them.</li>
            <li>Innovation: We continuously improve our services with the latest technologies.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-semibold mb-6 text-gray-800">Our Services</h3>
          <ul className="list-disc list-inside text-lg text-gray-600 space-y-2">
            <li>Wide Range of Vehicles: From compact cars to luxury SUVs, we have a vehicle for every occasion.</li>
            <li>Easy Booking: Our user-friendly platform makes it simple to find and book your perfect vehicle.</li>
            <li>Flexible Rental Options: We offer daily, weekly, and monthly rental plans to suit your schedule.</li>
            <li>24/7 Support: Our customer support team is available around the clock to assist you with any queries or issues.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h3 className="text-3xl font-semibold mb-6 text-gray-800">Why Choose Us</h3>
          <ul className="list-disc list-inside text-lg text-gray-600 space-y-2">
            <li>Competitive Rates: We offer the best prices for high-quality vehicles.</li>
            <li>Convenient Locations: We have multiple pickup and drop-off locations for your convenience.</li>
            <li>Customer-Centric Approach: Your satisfaction is our top priority, and we go the extra mile to ensure you have a great experience.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
