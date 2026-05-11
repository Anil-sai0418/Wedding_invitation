export const weddingData = {
  bride: {
    name: "Priya Lakshmi",
    surname: "Venkat",
    parents: "Sri & Smt. Venkata Rao",
    photo: "/images/portrait.svg",
  },
  groom: {
    name: "Arjun",
    surname: "Reddy",
    parents: "Sri & Smt. Ramu Reddy",
    photo: "/images/portrait.svg",
  },
  wedding: {
    date: new Date("2026-02-14T10:45:00"),
    muhurtamStart: "10:45 AM",
    muhurtamEnd: "12:15 PM",
    nakshatra: "Rohini",
    tithi: "Panchami",
    rashi: "Vrishabha",
  },
  venue: {
    name: "Sri Venkateswara Kalyana Mandapam",
    address: "Road No. 12, Banjara Hills, Hyderabad – 500034",
    mapUrl: "https://maps.google.com/?q=Sri+Venkateswara+Kalyana+Mandapam+Banjara+Hills",
    mapsEmbed:
      "https://www.google.com/maps?q=Banjara+Hills+Hyderabad&output=embed",
  },
  schedule: [
    { event: "Haldi Ceremony", day: "Feb 13", time: "10:00 AM", venue: "Bride's Residence", icon: "🌿", isMain: false },
    { event: "Mehendi & Sangeet", day: "Feb 13", time: "5:00 PM", venue: "Sri Venkateswara Mandapam", icon: "🎨", isMain: false },
    { event: "Wedding Ceremony", day: "Feb 14", time: "10:45 AM", venue: "Sri Venkateswara Mandapam", icon: "💍", isMain: true },
    { event: "Wedding Reception", day: "Feb 14", time: "7:00 PM", venue: "Sri Venkateswara Mandapam", icon: "✨", isMain: false },
    { event: "Grand Dinner", day: "Feb 14", time: "8:30 PM", venue: "Sri Venkateswara Mandapam", icon: "🍽️", isMain: false },
  ],
  contacts: [
    { name: "Ravi Kumar", relation: "Bride's Brother", phone: "+919876543210" },
    { name: "Suresh Reddy", relation: "Groom's Uncle", phone: "+919123456789" },
  ],
  message: `With immense joy and the blessings of the Almighty, we joyfully invite you to witness and bless the sacred union of our beloved children. Your presence will make this celebration truly divine. Please grace us with your love and blessings.`,
};

export type WeddingData = typeof weddingData;
