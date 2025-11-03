// Translations for English and Indonesian
const translations = {
  en: {
    nav: {
      about: "About",
      trips: "Trips",
      contact: "Contact"
    },
    about: {
      hero: {
        title: "About the project",
        subtitle: "Coral Hero Komodo is a community-led reef restoration initiative in Komodo National Park, Indonesia." +
          "We restore damaged reefs through coral transplantation and ongoing monitoring—working hand in hand with local communities and divers to protect marine life." +
          "Our mission is to rebuild healthy reefs, support coastal livelihoods, and inspire more people to care for the ocean"
      },
      reefsMatter: {
        title: "Why reefs matter",
        p1: "Coral reefs are among the most biodiverse ecosystems on Earth, providing shelter and food for countless marine species. They protect coastlines from waves and erosion, support fisheries that feed millions, and sustain tourism-based livelihoods.",
        p2: "Healthy reefs also help stabilize our climate by storing carbon and keeping ocean ecosystems in balance. Their survival ensures the future of countless species, including our own."
      },
      howItWorks: {
        title: "How it works",
        step1: "<strong>Assess</strong> reef sites to identify areas damaged by anchors, storms, or bleaching, and select suitable restoration zones.",
        step2: "<strong>Collect</strong> healthy coral fragments from resilient donor colonies or naturally broken pieces.",
        step3: "<strong>Transplant</strong> these fragments onto stable reef structures or frames to encourage new coral growth.",
        step4: "<strong>Monitor</strong> survival, growth, and biodiversity over time, involving local divers and community members in long-term stewardship.",
        p: "All activities follow local permits and are co-designed with community partners to ensure sustainable and measurable impact."
      },
      principles: {
        science: {
          title: "Science-Based",
          text: "Our work is guided by ecological understanding and continuous monitoring. We assess reef health, identify threats, and apply proven restoration methods to support long-term reef recovery"
        },
        community: {
          title: "Community-Driven",
          text: "We collaborate with local divers, fishers, and students to restore and protect the reefs they depend on. By involving the community at every step, we build shared responsibility and lasting conservation impact."
        },
        education: {
          title: "Education-Focused",
          text: "Knowledge builds connection. Through field training, outreach, and collaboration with local partners, we promote awareness of reef ecology and inspire more people to care for the ocean."
        },
        impact: {
          title: "Sustainable Impact",
          text: "Each restoration site is designed to strengthen reef resilience, enhance biodiversity, and support coastal livelihoods. Our focus is on lasting outcomes that protect both nature and community well-being."
        }
      },
      nurseries: {
        title: "From Fragments to thriving reef",
        p: "Reef restoration begins by identifying damaged areas and recovering viable coral fragments from the surrounding reef. These fragments are secured onto stable structures in suitable habitats to encourage natural growth and regeneration. Over time, they form new reef frameworks that attract fish, invertebrates, and other marine life. Each site contributes to restoring ecological balance and healthy reef ecosystems",
        item1: "<strong>Site design:</strong> shade patches, flow corridors, and fish refuges.",
        item2: "<strong>Genetic diversity:</strong> mix tolerant and fast-growing lineages.",
        item3: "<strong>Monitoring:</strong> photo quadrats, growth rates, and biodiversity scores."
      },
      quote: {
        text: "\"Every fragment we plant is a promise to the future reef. The work is patient, the results beautiful.\"",
        attribution: "— Field lead, Coral Resurrection"
      },
      footer: "Open practices, lasting reefs."
    },
    trips: {
      title: "Trips — Komodo, Indonesia",
      subtitle: "Join Coral Hero Komodo in rebuilding coral reefs inside the world-famous Komodo National Park." +
        "Our coral restoration programs combine education, field practice, and diving in one of Indonesia’s most biodiverse marine ecosystems.",
      trip1: {
        title: "Coral Conservation Introduction (Inland Program)",
        duration: "Duration:",
        price: "Price:",
        level: "Level:",
        hours: "4 hours",
        priceValue: "USD 50 / IDR 800,000",
        levelValue: "Perfect for non-divers or anyone wanting to understand coral restoration basics.",
        description: "This half-day session introduces participants to coral reef ecology, restoration techniques, and community conservation. Learn the fundamentals of coral biology, threats to reefs, and the science behind coral restoration in Komodo.",
        outline: "What is included",
        point1: "4-hour classroom session (Introduction, Conservation, Restoration Techniques, Q&A)",
        point2: "Coral Hero presentation materials",
        point3: "Certificate of Participation.",
        button: "Book lecture"
      },
      trip2: {
        title: "Coral Planting Experience (Theory + Local Restoration)",
        duration: "±8 Hours",
        price: "USD 120 / IDR 1,950,000",
        level: "Ideal for divers or snorkelers eager to make a tangible difference in local reef",
        description: "Spend a full day with our restoration team—learn the theory of coral restoration in the morning, then head out by boat to our active restoration site to plant your own coral fragments.",
        plan: "What is included",
        point1: "Classroom theory session (Restoration Ecology, Coral Biology, Techniques)",
        point2: "Boat transport to local restoration site",
        point3: "Hands-on coral planting session",
        point4: "Use of snorkel equipment",
        point5: {
          main: "<strong>Optional dive(+USD 50 / IDR 800,000).</strong> Prerequisites for diver:",
          prerequisites1: "Certified Open Water Diver (or equivalent)",
          prerequisites2: " Minimum 10 logged dives with good buoyancy"
        },
        button: "Check availability"
      },
      trip3: {
        title: "Coral Restoration Workshop (2 Days)",
        duration: "2 Days",
        price: "USD 300 / IDR 4,900,000",
        level: "Certified Open Water Diver (or equivalent).Minimum 20 logged dives with good buoyancy",
        description: "A 2-day immersive workshop combining theory, restoration practice, and diving. Learn from our in-house marine restoration instructors and take part in ongoing projects.",
        plan: "Detailed plan",
        includes: "What is included",
        day1: {
          title: "Day 1",
          point1: "Coral ecology and restoration theory.",
          point2: "Coral planting and maintenance at our restoration site.",
        },
        day2: {
          title: "Day 2",
          point1: "2 fun dives + 1 restoration dive.",
          point2: "Data collection and monitoring techniques",
        },
        point1: "Hands-on coral planting session (snorkling)",
        point2: "3 dives (2 fun + 1 restoration)",
        point3: "Marine park fee",
        point4: "Dive equipment",
        point5: "Training manual",
        point6: "Certificate of Completion",
        button: "Reserve spot"
      },
      trip4: {
        title: "PADI Coral Restoration Specialty (3 Days)",
        duration: "3 Days",
        price: "USD 500 / IDR 8,200,000",
        level: "Certified Open Water Diver (or equivalent). Minimum 10 logged dives with good buoyancy",
        description: "Become a certified Coral Restoration Diver with our official PADI Coral Restoration Specialty. Learn theory, propagation, coral nursery maintenance, and transplantation techniques.",
        components: {
          title: "Course Components",
          point1: "Restoration Ecology Theory",
          point2: "Physical Restoration (reef structures, substrates, stabilization)",
          point3: "Coral Transplantation Techniques",
          point4: "Coral Nursery Maintenance",
          point5: "Monitoring and Data Collection",
        },
        plan: {
          title: "Detailed Plan",
          day1: {
            title: "Day 1 (4 hours)",
            point1: "Coral ecology and restoration theory",
          },
          day2: {
            title: "Day 2 (day trip)",
            point1: "1 fun dives + 2 restoration dive",
            potin2: "Data collection and monitoring techniques"
          },
          day3: {
            title: "Day 3 (day trip)",
            point1: "1 fun dives + 2 restoration dive",
            point2: "Coral planting and structure maintenace"
          }
        },
        includes: {
          title: "What is included",
          point1: "2 fun dives + 4 coral restoration dives",
          point2: "PADI Specialty certification fee",
          point3: "Marine park entry fee",
          point4: "Training manual",
          point5: "Coral adoption frame (1 frame per student)"
        },
        certifications: {
          title: "Certifications",
          potin1: "PADI Coral Restoration Diver Specialty",
          potin2: "Coral Hero Restoration Certificate"
        },
        button: "Request syllabus"
      },
      footer: "Travel that restores."
    },
    contact: {
      title: "Contact",
      subtitle: "Reach out for trip info, partnerships, or media. We usually respond within 1–2 business days.",
      links: "Links",
      whereWeWork: "Where we work",
      whereText: "Field operations span the Indian Ocean, Coral Triangle, and Caribbean, in partnership with local organizations.",
      footer: "Say hello."
    }
  },
  id: {
    nav: {
      about: "Tentang",
      trips: "Perjalanan",
      contact: "Kontak"
    },
    about: {
      hero: {
        title: "Tentang proyek",
        subtitle: "Coral Hero Komodo adalah inisiatif restorasi terumbu yang dipimpin komunitas di Taman Nasional Komodo, Indonesia. Kami memulihkan terumbu yang rusak melalui transplantasi karang dan pemantauan berkelanjutan—bekerja bersama masyarakat lokal dan penyelam untuk melindungi kehidupan laut. Misi kami adalah membangun kembali terumbu yang sehat, mendukung mata pencaharian pesisir, dan menginspirasi lebih banyak orang untuk peduli pada laut."
      },
      reefsMatter: {
        title: "Mengapa terumbu penting",
        p1: "Terumbu karang adalah salah satu ekosistem paling kaya keanekaragaman hayati di Bumi, menyediakan tempat tinggal dan makanan bagi banyak spesies laut. Terumbu melindungi garis pantai dari gelombang dan abrasi, menopang perikanan yang memberi makan jutaan orang, dan mendukung mata pencaharian melalui pariwisata.",
        p2: "Terumbu yang sehat juga membantu menstabilkan iklim dengan menyimpan karbon dan menjaga keseimbangan ekosistem laut. Kelestarian terumbu memastikan masa depan tak terhitung spesies—termasuk manusia."
      },
      howItWorks: {
        title: "Cara kerjanya",
        step1: "<strong>Menilai</strong> lokasi terumbu untuk mengidentifikasi area yang rusak oleh jangkar, badai, atau pemutihan, lalu memilih zona restorasi yang sesuai.",
        step2: "<strong>Mengumpulkan</strong> fragmen karang sehat dari koloni donor yang tangguh atau pecahan alami.",
        step3: "<strong>Transplantasi</strong> fragmen ke struktur terumbu yang stabil atau rangka untuk mendorong pertumbuhan baru.",
        step4: "<strong>Memantau</strong> kelangsungan, pertumbuhan, dan keanekaragaman hayati dari waktu ke waktu, melibatkan penyelam dan komunitas lokal dalam perawatan jangka panjang.",
        p: "Semua kegiatan mengikuti perizinan lokal dan dirancang bersama mitra komunitas untuk memastikan dampak yang berkelanjutan dan terukur."
      },
      principles: {
        science: {
          title: "Berbasis Sains",
          text: "Kerja kami dipandu pemahaman ekologi dan pemantauan berkelanjutan. Kami menilai kesehatan terumbu, mengidentifikasi ancaman, dan menerapkan metode restorasi yang teruji untuk pemulihan jangka panjang."
        },
        community: {
          title: "Digerakkan Komunitas",
          text: "Kami berkolaborasi dengan penyelam, nelayan, dan pelajar setempat untuk memulihkan serta melindungi terumbu yang mereka andalkan. Dengan melibatkan komunitas di setiap langkah, kami membangun tanggung jawab bersama dan dampak konservasi yang bertahan lama."
        },
        education: {
          title: "Berfokus pada Edukasi",
          text: "Pengetahuan menumbuhkan kepedulian. Melalui pelatihan lapangan, sosialisasi, dan kolaborasi dengan mitra lokal, kami meningkatkan pemahaman ekologi terumbu dan menginspirasi lebih banyak orang untuk peduli pada laut."
        },
        impact: {
          title: "Dampak Berkelanjutan",
          text: "Setiap lokasi restorasi dirancang untuk memperkuat ketangguhan terumbu, meningkatkan keanekaragaman hayati, dan mendukung mata pencaharian pesisir. Fokus kami pada hasil jangka panjang yang melindungi alam dan kesejahteraan komunitas."
        }
      },
      nurseries: {
        title: "Dari fragmen menjadi terumbu yang subur",
        p: "Restorasi terumbu dimulai dengan mengidentifikasi area rusak dan mengambil fragmen karang yang masih layak dari sekitar lokasi. Fragmen kemudian dipasang pada struktur yang stabil di habitat yang sesuai untuk mendorong pertumbuhan dan regenerasi alami. Seiring waktu, fragmen membentuk kerangka terumbu baru yang menarik ikan, invertebrata, dan biota lain. Setiap lokasi membantu memulihkan keseimbangan ekologi dan ekosistem terumbu yang sehat.",
        item1: "<strong>Desain lokasi:</strong> area teduh, koridor aliran, dan tempat perlindungan ikan.",
        item2: "<strong>Keanekaragaman genetik:</strong> campuran keturunan toleran dan cepat tumbuh.",
        item3: "<strong>Pemantauan:</strong> kuadran foto, tingkat pertumbuhan, dan skor keanekaragaman hayati."
      },
      quote: {
        text: "\"Setiap fragmen yang kami tanam adalah janji untuk terumbu masa depan. Pekerjaannya sabar, hasilnya indah.\"",
        attribution: "— Pemimpin lapangan, Coral Resurrection"
      },
      footer: "Praktik terbuka, terumbu abadi."
    },
    trips: {
      title: "Perjalanan — Komodo, Indonesia",
      subtitle: "Semua kegiatan berlangsung di sekitar Taman Nasional Komodo. Pelajari dasar restorasi karang dan ikuti penyelaman bermakna di terumbu yang menakjubkan.",
      trip1: {
        title: "Kursus Restorasi Karang Edukatif — Komodo",
        duration: "Durasi:",
        price: "Harga:",
        level: "Tingkat:",
        hours: "4 jam",
        priceValue: "$50",
        levelValue: "Semua orang",
        description: "Kuliah terarah tentang ekologi terumbu, metode restorasi, serta tantangan dan solusi khusus Komodo.",
        outline: "Garis besar kursus",
        point1: "Dasar-dasar terumbu: struktur, tekanan, dan jalur pemulihan.",
        point2: "Perangkat restorasi: pembibitan, mikro-fragmen, pemantauan.",
        point3: "Studi kasus Komodo dan cara berkontribusi secara bertanggung jawab.",
        button: "Pesan kuliah"
      },
      trip2: {
        title: "Kelas Karang + Perjalanan 1 Hari (2 penyelaman) — Komodo",
        duration: "1 hari",
        price: "$150",
        level: "Snorkeler atau Open Water",
        description: "Sesi edukasi pagi diikuti dua penyelaman berpemandu di lokasi dekat area restorasi dengan praktik ramah terumbu.",
        plan: "Rencana rinci",
        point1: "Pagi: Sesi kelas dan briefing.",
        point2: "Sore: Dua penyelaman kapal; penyesuaian daya apung, dasar identifikasi, pencatatan foto.",
        button: "Cek ketersediaan"
      },
      trip3: {
        title: "Lokakarya Restorasi Karang (2 Hari)",
        duration: "2 Hari",
        price: "USD 300 / IDR 4.900.000",
        level: "Open Water Diver tersertifikasi (atau setara). Minimal 20 log penyelaman dengan buoyancy baik",
        description: "Lokakarya 2 hari yang mendalam menggabungkan teori, praktik restorasi, dan penyelaman. Belajar bersama instruktur restorasi internal kami dan berkontribusi pada proyek yang sedang berjalan.",
        plan: "Rencana rinci",
        includes: "Yang termasuk",
        day1: {
          title: "Hari 1",
          point1: "Teori ekologi karang dan restorasi.",
          point2: "Penanaman dan perawatan karang di lokasi restorasi kami."
        },
        day2: {
          title: "Hari 2",
          point1: "2 fun dives + 1 penyelaman restorasi.",
          point2: "Teknik pengumpulan data dan pemantauan",
        },
        point1: "Sesi penanaman karang langsung (snorkeling)",
        point2: "3 penyelaman (2 fun + 1 restorasi)",
        point3: "Tiket masuk taman nasional",
        point4: "Peralatan selam",
        point5: "Buku panduan pelatihan",
        point6: "Sertifikat penyelesaian",
        button: "Pesan tempat"
      },
      trip4: {
        title: "PADI Coral Restoration Specialty (3 Hari)",
        duration: "3 Hari",
        price: "USD 500 / IDR 8.200.000",
        level: "Open Water Diver tersertifikasi (atau setara). Minimal 10 log penyelaman dengan buoyancy baik",
        description: "Jadilah Coral Restoration Diver tersertifikasi melalui PADI Coral Restoration Specialty resmi. Pelajari teori, propagasi, perawatan nursery karang, dan teknik transplantasi.",
        components: {
          title: "Komponen Kursus",
          point1: "Teori Ekologi Restorasi",
          point2: "Restorasi Fisik (struktur terumbu, substrat, stabilisasi)",
          point3: "Teknik Transplantasi Karang",
          point4: "Perawatan Nursery Karang",
          point5: "Pemantauan dan Pengumpulan Data",
        },
        plan: {
          title: "Rencana Rinci",
          day1: { title: "Hari 1 (4 jam)", point1: "Teori ekologi karang dan restorasi" },
          day2: { title: "Hari 2 (trip harian)", point1: "1 fun dive + 2 penyelaman restorasi", potin2: "Teknik pengumpulan data dan pemantauan" },
          day3: { title: "Hari 3 (trip harian)", point1: "1 fun dive + 2 penyelaman restorasi", point2: "Penanaman karang dan perawatan struktur" }
        },
        includes: {
          title: "Termasuk",
          point1: "2 fun dives + 4 penyelaman restorasi karang",
          point2: "Biaya sertifikasi PADI Specialty",
          point3: "Tiket masuk taman nasional",
          point4: "Buku panduan pelatihan",
          point5: "Adopsi rangka karang (1 rangka per peserta)"
        },
        certifications: {
          title: "Sertifikasi",
          potin1: "PADI Coral Restoration Diver Specialty",
          potin2: "Sertifikat Restorasi Coral Hero"
        },
        button: "Minta silabus"
      },
      footer: "Perjalanan yang memulihkan."
    },
    contact: {
      title: "Kontak",
      subtitle: "Hubungi kami untuk informasi perjalanan, kemitraan, atau media. Kami biasanya merespons dalam 1–2 hari kerja.",
      links: "Tautan",
      whereWeWork: "Di mana kami bekerja",
      whereText: "Kegiatan lapangan mencakup Samudra Hindia, Segitiga Karang, dan Karibia, bekerja sama dengan organisasi lokal.",
      footer: "Ucapkan halo."
    }
  }
};

