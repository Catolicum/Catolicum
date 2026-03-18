export const BOOKS = [
  // CLÁSICOS CATÓLICOS
  {
    t: "La Biblia", a: "Varios autores", y: "s. I–V", s: 10, cat: "Clásico católico", l: "es",
    an: "Texto fundacional de la fe católica. Inspirada por el Espíritu Santo según el Magisterio. El canon católico incluye 73 libros.",
    tags: ["Revelación", "Dogma", "Canon"], ref: "Dei Verbum, Concilio Vaticano II"
  },
  {
    t: "The Bible", a: "Various authors", y: "1st–5th c.", s: 10, cat: "Catholic classic", l: "en",
    an: "Foundational text of the Catholic faith. Inspired Scripture as defined by the Magisterium. The Catholic canon includes 73 books.",
    tags: ["Revelation", "Dogma", "Canon"], ref: "Dei Verbum, Vatican II"
  },
  {
    t: "Summa Theologica", a: "Santo Tomás de Aquino", y: "1265–1274", s: 10, cat: "Clásico católico", l: "es",
    an: "Cima de la teología escolástica. Referencia filosófica y teológica del Magisterio. Demuestra la armonía entre fe y razón.",
    tags: ["Escolástica", "Dogma", "Filosofía"], ref: "Aeterni Patris, León XIII"
  },
  {
    t: "Confesiones", a: "San Agustín de Hipona", y: "397–400", s: 10, cat: "Clásico católico", l: "es",
    an: "Autobiografía espiritual de uno de los Padres de la Iglesia. Modelo de conversión y búsqueda de Dios. Plenamente alineado con la doctrina.",
    tags: ["Conversión", "Gracia", "Patrística"], ref: "CIC 1700"
  },
  {
    t: "Confessions", a: "St. Augustine", y: "397–400", s: 10, cat: "Catholic classic", l: "en",
    an: "Spiritual autobiography of a Doctor of the Church. A model of conversion and God-seeking. Fully aligned with Catholic doctrine.",
    tags: ["Conversion", "Grace", "Patristics"], ref: "CCC 1700"
  },
  {
    t: "La Imitación de Cristo", a: "Tomás de Kempis", y: "1418", s: 10, cat: "Clásico católico", l: "es",
    an: "El libro más leído en la Iglesia tras la Biblia. Guía de devoción y vida interior, recomendado por incontables santos y papas.",
    tags: ["Devoción", "Ascética", "Espiritualidad"], ref: "Recomendado por múltiples Papas"
  },
  {
    t: "The Imitation of Christ", a: "Thomas à Kempis", y: "1418", s: 10, cat: "Catholic classic", l: "en",
    an: "The most-read book in the Church after the Bible. A guide to devotion and interior life, commended by countless saints and popes.",
    tags: ["Devotion", "Ascetics", "Spirituality"], ref: "Commended by multiple Popes"
  },
  {
    t: "El Señor del Mundo", a: "Robert Hugh Benson", y: "1907", s: 9, cat: "Clásico católico", l: "es",
    an: "Novela distópica profética mencionada por el Papa Francisco. Retrata el relativismo y el anticristianismo con lucidez sorprendente.",
    tags: ["Distopía", "Fe", "Profecía"], ref: "Mencionada por Papa Francisco (2013)"
  },
  {
    t: "Lord of the World", a: "Robert Hugh Benson", y: "1907", s: 9, cat: "Catholic classic", l: "en",
    an: "Prophetic dystopian novel praised by Pope Francis. Depicts relativism and anti-Christianity with remarkable foresight.",
    tags: ["Dystopia", "Faith", "Prophecy"], ref: "Praised by Pope Francis (2013)"
  },
  {
    t: "El Señor de los Anillos", a: "J.R.R. Tolkien", y: "1954", s: 9, cat: "Clásico católico", l: "es",
    an: "Tolkien era católico devoto. La obra está impregnada de cosmovisión cristiana: redención, sacrificio, providencia y lucha entre bien y mal.",
    tags: ["Redención", "Providencia", "Bien y mal"], ref: "Carta de Tolkien a su hijo (1953)"
  },
  {
    t: "The Lord of the Rings", a: "J.R.R. Tolkien", y: "1954", s: 9, cat: "Catholic classic", l: "en",
    an: "Tolkien was a devout Catholic. The work is imbued with Christian themes: redemption, sacrifice, providence and the struggle between good and evil.",
    tags: ["Redemption", "Providence", "Good vs Evil"], ref: "Tolkien's letter to his son (1953)"
  },
  {
    t: "The Screwtape Letters", a: "C.S. Lewis", y: "1942", s: 8, cat: "Catholic classic", l: "en",
    an: "Though Lewis was Anglican, this book is widely recommended by Catholic theologians for its sharp portrayal of temptation and spiritual warfare.",
    tags: ["Spiritual warfare", "Temptation", "Virtue"], ref: "Widely recommended by Catholic clergy"
  },
  {
    t: "Mere Christianity", a: "C.S. Lewis", y: "1952", s: 8, cat: "Catholic classic", l: "en",
    an: "Rational defense of Christian faith broadly compatible with Catholic doctrine. Widely used in Catholic apologetics despite Lewis being Anglican.",
    tags: ["Apologetics", "Faith", "Reason"], ref: "Recommended by Catholic apologists"
  },
  {
    t: "Historia de un Alma", a: "Santa Teresa de Lisieux", y: "1898", s: 10, cat: "Clásico católico", l: "es",
    an: "Autobiografía de la Doctora de la Iglesia. Su 'pequeño camino' es una de las espiritualidades más aprobadas por el Magisterio.",
    tags: ["Santidad", "Espiritualidad", "Infancia espiritual"], ref: "Canonización 1925, Doctora 1997"
  },
  {
    t: "Story of a Soul", a: "St. Thérèse of Lisieux", y: "1898", s: 10, cat: "Catholic classic", l: "en",
    an: "Autobiography of a Doctor of the Church. Her 'little way' is among the most approved spiritualities in the Magisterium.",
    tags: ["Holiness", "Spirituality", "Little way"], ref: "Canonized 1925, Doctor 1997"
  },
  {
    t: "Camino", a: "San Josemaría Escrivá", y: "1934", s: 9, cat: "Clásico católico", l: "es",
    an: "Colección de máximas espirituales con aprobación eclesiástica formal. Fundamento espiritual del Opus Dei.",
    tags: ["Vida interior", "Santificación", "Trabajo"], ref: "Aprobación eclesiástica formal"
  },
  {
    t: "The Way", a: "St. Josemaría Escrivá", y: "1934", s: 9, cat: "Catholic classic", l: "en",
    an: "Collection of spiritual maxims with formal ecclesiastical approval. The spiritual cornerstone of Opus Dei.",
    tags: ["Interior life", "Sanctification", "Work"], ref: "Formal ecclesiastical approval"
  },
  {
    t: "Introduction to the Devout Life", a: "St. Francis de Sales", y: "1609", s: 10, cat: "Catholic classic", l: "en",
    an: "A Doctor of the Church's guide to holiness in everyday life. One of the most important works of Catholic spiritual direction ever written.",
    tags: ["Holiness", "Spiritual direction", "Virtue"], ref: "Doctor of the Church"
  },
  {
    t: "El Silencio", a: "Shusaku Endo", y: "1966", s: 8, cat: "Clásico católico", l: "es",
    an: "Meditación sobre la fe, el martirio y la gracia bajo persecución. Recomendada por el Papa Francisco. Lectora exigente pero teológicamente rica.",
    tags: ["Martirio", "Gracia", "Fe"], ref: "Recomendada por Papa Francisco"
  },
  {
    t: "Silence", a: "Shusaku Endo", y: "1966", s: 8, cat: "Catholic classic", l: "en",
    an: "Deep meditation on faith, martyrdom and grace under persecution. Recommended by Pope Francis. Emotionally demanding but theologically rich.",
    tags: ["Martyrdom", "Grace", "Faith"], ref: "Recommended by Pope Francis"
  },
  {
    t: "Evangelium Vitae", a: "Papa Juan Pablo II", y: "1995", s: 10, cat: "Clásico católico", l: "es",
    an: "Encíclica sobre la vida humana. Define la posición católica sobre aborto y eutanasia. Referencia directa del Magisterio.",
    tags: ["Vida", "Bioética", "Magisterio"], ref: "Encíclica papal"
  },
  {
    t: "Theology of the Body", a: "Pope John Paul II", y: "1979–1984", s: 10, cat: "Catholic classic", l: "en",
    an: "Groundbreaking papal catechesis on human sexuality, love and the body. Authoritative Magisterium on marriage and chastity.",
    tags: ["Sexuality", "Marriage", "Body"], ref: "Papal catechesis, 129 addresses"
  },
  {
    t: "La Divina Comedia", a: "Dante Alighieri", y: "1320", s: 9, cat: "Clásico católico", l: "es",
    an: "Obra maestra medieval estructurada sobre la teología católica del pecado, el purgatorio y el cielo. Plenamente alineada con la escatología católica.",
    tags: ["Escatología", "Purgatorio", "Cielo"], ref: "Marco teológico católico"
  },
  {
    t: "The Divine Comedy", a: "Dante Alighieri", y: "1320", s: 9, cat: "Catholic classic", l: "en",
    an: "Medieval masterpiece structured around Catholic theology of sin, purgatory and heaven. Fully aligned with Catholic eschatology.",
    tags: ["Eschatology", "Purgatory", "Heaven"], ref: "Catholic theological framework"
  },
  {
    t: "Seven Storey Mountain", a: "Thomas Merton", y: "1948", s: 9, cat: "Catholic classic", l: "en",
    an: "Autobiography of a convert who became a Trappist monk. One of the most influential Catholic conversion narratives of the 20th century.",
    tags: ["Conversion", "Monasticism", "Contemplation"], ref: "Widely endorsed by Catholic clergy"
  },
  {
    t: "Orthodoxy", a: "G.K. Chesterton", y: "1908", s: 9, cat: "Catholic classic", l: "en",
    an: "Brilliant intellectual defense of Christian orthodoxy. Chesterton later converted to Catholicism. Fully compatible with Catholic doctrine.",
    tags: ["Apologetics", "Orthodoxy", "Reason"], ref: "Widely recommended by Catholic clergy"
  },
  {
    t: "El Hobbit", a: "J.R.R. Tolkien", y: "1937", s: 8, cat: "Clásico católico", l: "es",
    an: "Prequel de El Señor de los Anillos con los mismos valores de fondo: humildad, providencia y coraje. Plenamente compatible con valores católicos.",
    tags: ["Virtud", "Providencia", "Aventura"], ref: "Cosmovisión tolkieniana"
  },
  {
    t: "The Hobbit", a: "J.R.R. Tolkien", y: "1937", s: 8, cat: "Catholic classic", l: "en",
    an: "Prequel to The Lord of the Rings with the same underlying values: humility, providence and courage. Fully compatible with Catholic values.",
    tags: ["Virtue", "Providence", "Adventure"], ref: "Tolkienian worldview"
  },
  {
    t: "El Exorcista", a: "William Peter Blatty", y: "1971", s: 7, cat: "Clásico católico", l: "es",
    an: "Blatty era católico practicante. La novela defiende la realidad del mal y la eficacia del exorcismo, en línea con la doctrina (CIC 1673). El tono perturbador puede ser difícil para algunos lectores.",
    tags: ["Demonología", "Exorcismo", "Fe"], ref: "CIC 1673"
  },
  {
    t: "The Exorcist", a: "William Peter Blatty", y: "1971", s: 7, cat: "Catholic classic", l: "en",
    an: "Blatty was a devout Catholic. The novel affirms the reality of evil and the efficacy of exorcism, in line with Catholic doctrine (CCC 1673). Disturbing tone may be hard for some readers.",
    tags: ["Demonology", "Exorcism", "Faith"], ref: "CCC 1673"
  },
  {
    t: "Crime and Punishment", a: "Fyodor Dostoevsky", y: "1866", s: 9, cat: "Catholic classic", l: "en",
    an: "Deeply Christian exploration of sin, guilt, redemption and the transformative power of suffering and love. Widely commended by Catholic thinkers.",
    tags: ["Sin", "Redemption", "Suffering"], ref: "Christian literary tradition"
  },

  // LIBROS CRÍTICOS
  {
    t: "El Código Da Vinci", a: "Dan Brown", y: "2003", s: 1, cat: "Crítico", l: "es",
    an: "Presenta como histórica la tesis sin base académica de que Jesús se casó con María Magdalena y la Iglesia lo ocultó. Distorsiona deliberadamente la historia del cristianismo primitivo.",
    tags: ["Desinformación", "Gnosticismo", "Anti-Iglesia"], ref: "Refutado por Pontificia Comisión Bíblica"
  },
  {
    t: "The Da Vinci Code", a: "Dan Brown", y: "2003", s: 1, cat: "Critical", l: "en",
    an: "Presents as historical fact the academically unsupported claim that Jesus married Mary Magdalene and the Church concealed it. Deliberately distorts early Christian history.",
    tags: ["Misinformation", "Gnosticism", "Anti-Church"], ref: "Refuted by Pontifical Biblical Commission"
  },
  {
    t: "El Anticristo", a: "Friedrich Nietzsche", y: "1895", s: 1, cat: "Crítico", l: "es",
    an: "Ataque sistemático al cristianismo como 'moral de esclavos'. Nietzsche rechaza explícitamente los valores evangélicos y propone su superación filosófica.",
    tags: ["Ateísmo", "Nihilismo", "Anti-cristiano"], ref: "Contrario a CIC 2089"
  },
  {
    t: "The Antichrist", a: "Friedrich Nietzsche", y: "1895", s: 1, cat: "Critical", l: "en",
    an: "A systematic attack on Christianity as 'slave morality'. Nietzsche explicitly rejects Gospel values and calls for their philosophical transcendence.",
    tags: ["Atheism", "Nihilism", "Anti-Christian"], ref: "Contrary to CCC 2089"
  },
  {
    t: "Así Habló Zaratustra", a: "Friedrich Nietzsche", y: "1883", s: 1, cat: "Crítico", l: "es",
    an: "Proclama la 'muerte de Dios' y el Übermensch como superación del hombre cristiano. Fundamentalmente contrario a la antropología y teología católica.",
    tags: ["Ateísmo", "Superhombre", "Muerte de Dios"], ref: "Contrario a CIC 2089, GS 19"
  },
  {
    t: "Thus Spoke Zarathustra", a: "Friedrich Nietzsche", y: "1883", s: 1, cat: "Critical", l: "en",
    an: "Proclaims the 'death of God' and the Übermensch as the overcoming of Christian humanity. Fundamentally contrary to Catholic anthropology.",
    tags: ["Atheism", "Overman", "Death of God"], ref: "Contrary to CCC 2089"
  },
  {
    t: "The God Delusion", a: "Richard Dawkins", y: "2006", s: 1, cat: "Critical", l: "en",
    an: "A systematic argument that God is a delusion and religion is harmful. Directly attacks Catholic theology, the existence of God and religious morality.",
    tags: ["Atheism", "Anti-religion", "Materialism"], ref: "Contrary to CCC 31, 36"
  },
  {
    t: "God Is Not Great", a: "Christopher Hitchens", y: "2007", s: 1, cat: "Critical", l: "en",
    an: "Argues that religion 'poisons everything'. A direct and sustained attack on Catholicism, its history, institutions and moral claims.",
    tags: ["Atheism", "Anti-religion", "Secularism"], ref: "Contrary to CCC 31"
  },
  {
    t: "The Golden Compass", a: "Philip Pullman", y: "1995", s: 1, cat: "Critical", l: "en",
    an: "Pullman has stated the series is explicitly anti-Catholic. The 'Magisterium' is a villainous oppressive Church. The series culminates in a symbolic killing of God.",
    tags: ["Anti-Church", "Anti-Catholic", "Fantasy"], ref: "Condemned by Catholic League (2007)"
  },
  {
    t: "La Brújula Dorada", a: "Philip Pullman", y: "1995", s: 1, cat: "Crítico", l: "es",
    an: "Pullman ha declarado que la serie es deliberadamente anti-cristiana. El 'Magisterio' es una Iglesia opresora villana. La serie culmina en una muerte simbólica de Dios.",
    tags: ["Anti-Iglesia", "Anti-católico", "Fantasía"], ref: "Condenada por Catholic League (2007)"
  },
  {
    t: "Ángeles y Demonios", a: "Dan Brown", y: "2000", s: 2, cat: "Crítico", l: "es",
    an: "Retrata a líderes de la Iglesia como asesinos y al Vaticano como institución opresora. Históricamente inexacto y deliberadamente hostil.",
    tags: ["Anti-Iglesia", "Desinformación", "Thriller"], ref: "Históricamente inexacto según expertos vaticanos"
  },
  {
    t: "Angels & Demons", a: "Dan Brown", y: "2000", s: 2, cat: "Critical", l: "en",
    an: "Portrays Church leaders as murderers and the Vatican as oppressive. Historically inaccurate and deliberately hostile to the Catholic Church.",
    tags: ["Anti-Church", "Misinformation", "Thriller"], ref: "Historically inaccurate per Vatican scholars"
  },
  {
    t: "Sapiens", a: "Yuval Noah Harari", y: "2011", s: 2, cat: "Crítico", l: "es",
    an: "Trata la religión como 'ficción colectiva'. Reduce el cristianismo a una narrativa cultural sin valor de verdad. Materialismo histórico incompatible con la fe católica.",
    tags: ["Materialismo", "Secularismo", "Historia"], ref: "Contrario a Dei Verbum, CIC 36"
  },
  {
    t: "Sapiens", a: "Yuval Noah Harari", y: "2011", s: 2, cat: "Critical", l: "en",
    an: "Treats religion as a 'collective fiction'. Reduces Christianity to a cultural narrative without truth value. Historical materialism incompatible with Catholic faith.",
    tags: ["Materialism", "Secularism", "History"], ref: "Contrary to Dei Verbum"
  },
  {
    t: "Homo Deus", a: "Yuval Noah Harari", y: "2015", s: 1, cat: "Crítico", l: "es",
    an: "Argumenta que los humanos se convertirán en dioses mediante la tecnología, sustituyendo a la religión. Incompatible con la antropología católica y la existencia de Dios.",
    tags: ["Transhumanismo", "Ateísmo", "Tecnología"], ref: "Contrario a CIC 36, 2289"
  },
  {
    t: "Homo Deus", a: "Yuval Noah Harari", y: "2015", s: 1, cat: "Critical", l: "en",
    an: "Argues humans will become gods through technology, replacing religion. Directly incompatible with Catholic anthropology and the existence of a transcendent God.",
    tags: ["Transhumanism", "Atheism", "Technology"], ref: "Contrary to CCC 36, 2289"
  },
  {
    t: "El Capital", a: "Karl Marx", y: "1867", s: 2, cat: "Crítico", l: "es",
    an: "La doctrina marxista es incompatible con la doctrina social católica: niega la propiedad privada legítima y la transcendencia. La Iglesia ha condenado el comunismo en múltiples documentos.",
    tags: ["Marxismo", "Ateísmo", "Materialismo"], ref: "Rerum Novarum, Divini Redemptoris"
  },
  {
    t: "The Communist Manifesto", a: "Marx & Engels", y: "1848", s: 1, cat: "Critical", l: "en",
    an: "Foundational text of communism, condemned by the Church for its materialism, class hatred and abolition of family and private property.",
    tags: ["Communism", "Materialism", "Atheism"], ref: "Divini Redemptoris, Pius XI (1937)"
  },
  {
    t: "El Secreto", a: "Rhonda Byrne", y: "2006", s: 1, cat: "Crítico", l: "es",
    an: "Promueve la 'ley de atracción': los humanos pueden controlar la realidad con el pensamiento. Incompatible con la doctrina católica sobre oración, providencia y humildad.",
    tags: ["New Age", "Pensamiento mágico", "Autoayuda"], ref: "Contrario a CIC 2116, 2117"
  },
  {
    t: "The Secret", a: "Rhonda Byrne", y: "2006", s: 1, cat: "Critical", l: "en",
    an: "Promotes the 'law of attraction': humans can control reality through thought. Incompatible with Catholic teaching on prayer, providence and humility.",
    tags: ["New Age", "Magic thinking", "Self-help"], ref: "Contrary to CCC 2116, 2117"
  },
  {
    t: "Cincuenta Sombras de Grey", a: "E.L. James", y: "2011", s: 1, cat: "Crítico", l: "es",
    an: "Contenido explícitamente sexual que promueve relaciones BDSM. Incompatible con la doctrina católica sobre la sexualidad humana y la dignidad de la persona.",
    tags: ["Sexualidad", "Inmoralidad", "Contenido adulto"], ref: "Contrario a CIC 2337, 2362"
  },
  {
    t: "Fifty Shades of Grey", a: "E.L. James", y: "2011", s: 1, cat: "Critical", l: "en",
    an: "Explicitly sexual content promoting BDSM. Incompatible with Catholic teaching on human sexuality, the dignity of persons and the meaning of conjugal love.",
    tags: ["Sexuality", "Immorality", "Adult content"], ref: "Contrary to CCC 2337, 2362"
  },
  {
    t: "El Cuento de la Criada", a: "Margaret Atwood", y: "1985", s: 2, cat: "Crítico", l: "es",
    an: "Presenta una teocracia cristiana como distopía totalitaria. Usa la imaginería cristiana de forma negativa. Ampliamente considerada hostil al cristianismo.",
    tags: ["Anti-cristiano", "Distopía", "Feminismo"], ref: "Críticos católicos: encuadre hostil"
  },
  {
    t: "The Handmaid's Tale", a: "Margaret Atwood", y: "1985", s: 2, cat: "Critical", l: "en",
    an: "Presents a Christian theocracy as a totalitarian dystopia. Uses Catholic and Protestant imagery negatively. Widely seen as hostile to Christianity.",
    tags: ["Anti-Christian", "Dystopia", "Feminism"], ref: "Catholic critics: hostile framing"
  },

  // AMBIGUOS / BESTSELLERS
  {
    t: "El Nombre de la Rosa", a: "Umberto Eco", y: "1980", s: 5, cat: "Ambiguo", l: "es",
    an: "Novela histórica ambientada en un monasterio medieval. Eco era agnóstico pero el texto no ataca la fe directamente. Lectura neutral para católicos.",
    tags: ["Historia", "Medioevo", "Misterio"], ref: "Análisis literario general"
  },
  {
    t: "The Name of the Rose", a: "Umberto Eco", y: "1980", s: 5, cat: "Ambiguous", l: "en",
    an: "Historical novel set in a medieval monastery. Eco was agnostic but the text does not directly attack faith. Neutral reading for Catholics.",
    tags: ["History", "Middle Ages", "Mystery"], ref: "General literary analysis"
  },
  {
    t: "Harry Potter y la Piedra Filosofal", a: "J.K. Rowling", y: "1997", s: 5, cat: "Ambiguo", l: "es",
    an: "Ha generado debate en comunidades católicas. El Vaticano emitió valoraciones mixtas. Algunos obispos la recomiendan por temas de sacrificio y amor; otros señalan la presentación positiva de la magia. No está condenada.",
    tags: ["Magia", "Fantasía", "Debate"], ref: "Declaraciones Vaticano (2003, 2009)"
  },
  {
    t: "Harry Potter and the Philosopher's Stone", a: "J.K. Rowling", y: "1997", s: 5, cat: "Ambiguous", l: "en",
    an: "Has generated debate in Catholic circles. The Vatican issued mixed assessments. Some bishops recommend it for themes of sacrifice and love; others flag the positive portrayal of magic. Not condemned.",
    tags: ["Magic", "Fantasy", "Debate"], ref: "Vatican statements (2003, 2009)"
  },
  {
    t: "Los Pilares de la Tierra", a: "Ken Follett", y: "1989", s: 4, cat: "Ambiguo", l: "es",
    an: "Follett es ateo declarado y la novela refleja una visión crítica de la institución eclesiástica, aunque no ataca la fe en sí. Presenta clérigos corruptos y virtuosos.",
    tags: ["Historia", "Medioevo", "Iglesia institucional"], ref: "Análisis literario católico"
  },
  {
    t: "The Pillars of the Earth", a: "Ken Follett", y: "1989", s: 4, cat: "Ambiguous", l: "en",
    an: "Follett is a declared atheist and the novel reflects a critical view of the Church as institution, though it does not attack faith itself. Presents both corrupt and virtuous clergy.",
    tags: ["History", "Middle Ages", "Church institution"], ref: "Catholic literary analysis"
  },
  {
    t: "1984", a: "George Orwell", y: "1949", s: 6, cat: "Ambiguo", l: "es",
    an: "Distopía que defiende dignidad humana, verdad y libertad de conciencia. Valores plenamente compatibles con la doctrina social católica. Orwell no era religioso pero el marco moral se alinea.",
    tags: ["Dignidad", "Libertad", "Totalitarismo"], ref: "Doctrina Social de la Iglesia"
  },
  {
    t: "1984", a: "George Orwell", y: "1949", s: 6, cat: "Ambiguous", l: "en",
    an: "Dystopia defending human dignity, truth and freedom of conscience — values compatible with Catholic social teaching. Orwell was not religious but the moral framework aligns.",
    tags: ["Dignity", "Freedom", "Totalitarism"], ref: "Catholic Social Teaching"
  },
  {
    t: "El Principito", a: "Antoine de Saint-Exupéry", y: "1943", s: 7, cat: "Ambiguo", l: "es",
    an: "Fábula filosófica con valores compatibles con la ética cristiana: amor desinteresado, responsabilidad, búsqueda de lo esencial. No es obra religiosa pero sus valores no contradicen la doctrina.",
    tags: ["Valores", "Amor", "Filosofía"], ref: "Compatibilidad ética general"
  },
  {
    t: "The Little Prince", a: "Antoine de Saint-Exupéry", y: "1943", s: 7, cat: "Ambiguous", l: "en",
    an: "Philosophical fable with values compatible with Christian ethics: selfless love, responsibility, search for the essential. Not religious but its values do not contradict Catholic doctrine.",
    tags: ["Values", "Love", "Philosophy"], ref: "General ethical compatibility"
  },
  {
    t: "El Alquimista", a: "Paulo Coelho", y: "1988", s: 3, cat: "Ambiguo", l: "es",
    an: "Mezcla sincretista de espiritualidades: New Age, esoterismo y religiones orientales. La 'Leyenda Personal' como guía moral es incompatible con la vocación cristiana como llamada de Dios.",
    tags: ["New Age", "Sincretismo", "Esoterismo"], ref: "Contrario a CIC 2116, 2117"
  },
  {
    t: "The Alchemist", a: "Paulo Coelho", y: "1988", s: 3, cat: "Ambiguous", l: "en",
    an: "Syncretic mix of New Age, esoterism and Eastern spiritualities. The 'Personal Legend' as moral guide is incompatible with the Christian vocation as God's call.",
    tags: ["New Age", "Syncretism", "Esoterism"], ref: "Contrary to CCC 2116, 2117"
  },
  {
    t: "Matar a un Ruiseñor", a: "Harper Lee", y: "1960", s: 8, cat: "Ambiguo", l: "es",
    an: "Defiende la dignidad humana, la justicia y la compasión. Valores plenamente compatibles con la doctrina social católica. Sin conflictos doctrinales.",
    tags: ["Justicia", "Dignidad", "Compasión"], ref: "Doctrina Social de la Iglesia"
  },
  {
    t: "To Kill a Mockingbird", a: "Harper Lee", y: "1960", s: 8, cat: "Ambiguous", l: "en",
    an: "Defends human dignity, justice and compassion. Values fully compatible with Catholic social teaching. No doctrinal conflicts.",
    tags: ["Justice", "Dignity", "Compassion"], ref: "Catholic Social Teaching"
  },
  {
    t: "Siddhartha", a: "Hermann Hesse", y: "1922", s: 2, cat: "Ambiguo", l: "es",
    an: "Novela sobre la búsqueda espiritual budista. Presenta la iluminación personal sin referencia a Dios ni a la redención. Visión espiritual incompatible con el camino de salvación cristiano.",
    tags: ["Budismo", "Sincretismo", "Espiritualidad"], ref: "Contrario a Dominus Iesus"
  },
  {
    t: "Siddhartha", a: "Hermann Hesse", y: "1922", s: 2, cat: "Ambiguous", l: "en",
    an: "Novel of Buddhist spiritual seeking. Presents personal enlightenment without reference to God or redemption. Spiritual vision incompatible with the Christian path of salvation.",
    tags: ["Buddhism", "Syncretism", "Spirituality"], ref: "Contrary to Dominus Iesus"
  },
  {
    t: "Un Mundo Feliz", a: "Aldous Huxley", y: "1932", s: 4, cat: "Ambiguo", l: "es",
    an: "Distopía que critica el hedonismo y la pérdida de trascendencia, compatible con advertencias católicas sobre el consumismo. Sin embargo, Huxley promovía el misticismo psicodélico.",
    tags: ["Distopía", "Hedonismo", "Trascendencia"], ref: "Compatibilidad parcial con DSI"
  },
  {
    t: "Brave New World", a: "Aldous Huxley", y: "1932", s: 4, cat: "Ambiguous", l: "en",
    an: "Dystopia criticising hedonism and loss of transcendence, compatible with Catholic warnings on consumerism. However Huxley promoted psychedelic mysticism incompatible with Catholic spirituality.",
    tags: ["Dystopia", "Hedonism", "Transcendence"], ref: "Partial compatibility with CST"
  },
  {
    t: "The Shack", a: "William P. Young", y: "2007", s: 3, cat: "Ambiguous", l: "en",
    an: "Presents a heterodox vision of the Trinity. Widely criticized by Catholic and Protestant theologians for theological errors, universalism and unorthodox depictions of God.",
    tags: ["Heterodoxy", "Trinity", "Universalism"], ref: "Criticized by Catholic theologians"
  },
  {
    t: "Eat Pray Love", a: "Elizabeth Gilbert", y: "2006", s: 2, cat: "Ambiguous", l: "en",
    an: "Promotes a syncretic spiritual journey mixing Hinduism, Buddhism and vague theism. Incompatible with Catholic teaching on the uniqueness of Christ and the Church.",
    tags: ["Syncretism", "New Age", "Spirituality"], ref: "Contrary to CCC 843, Dominus Iesus"
  },
  {
    t: "El Origen de las Especies", a: "Charles Darwin", y: "1859", s: 4, cat: "Ambiguo", l: "es",
    an: "La evolución no es condenada por la Iglesia, que la acepta como compatible con la creación. La tensión surge en la interpretación del alma humana, que la Iglesia considera creación directa de Dios.",
    tags: ["Evolución", "Ciencia", "Creación"], ref: "CIC 283, Juan Pablo II (1996)"
  },
  {
    t: "Breaking the Spell", a: "Daniel Dennett", y: "2006", s: 2, cat: "Critical", l: "en",
    an: "Treats religion as a natural phenomenon to be studied scientifically, denying its transcendent claims. Reductionist view incompatible with Catholic theology.",
    tags: ["Naturalism", "Reductionism", "Secularism"], ref: "Contrary to CCC 36"
  }, // MÁS CLÁSICOS CATÓLICOS
  {
    t: "La Ciudad de Dios", a: "San Agustín", y: "413–426", s: 10, cat: "Clásico católico", l: "es",
    an: "Tratado fundamental sobre la relación entre la Iglesia y el mundo. Pilar de la teología política católica. Escrito como respuesta al saqueo de Roma.",
    tags: ["Eclesiología", "Historia", "Filosofía"], ref: "Catecismo de la Iglesia Católica"
  },
  {
    t: "The City of God", a: "St. Augustine", y: "413–426", s: 10, cat: "Catholic classic", l: "en",
    an: "Foundational treatise on the relationship between the Church and the world. A pillar of Catholic political theology written in response to the sack of Rome.",
    tags: ["Ecclesiology", "History", "Philosophy"], ref: "Catechism of the Catholic Church"
  },
  {
    t: "La Suma Contra los Gentiles", a: "Santo Tomás de Aquino", y: "1259–1265", s: 10, cat: "Clásico católico", l: "es",
    an: "Obra apologética de Tomás de Aquino dirigida a no creyentes. Defiende racionalmente la fe católica sin recurrir a la autoridad de la Escritura.",
    tags: ["Apologética", "Filosofía", "Razón"], ref: "Magisterio de la Iglesia"
  },
  {
    t: "Interior Castle", a: "St. Teresa of Ávila", y: "1577", s: 10, cat: "Catholic classic", l: "en",
    an: "Mystical masterpiece by a Doctor of the Church describing the soul's journey to God through seven dwelling places. One of the greatest works of Catholic mysticism.",
    tags: ["Mysticism", "Prayer", "Soul"], ref: "Doctor of the Church, 1970"
  },
  {
    t: "El Castillo Interior", a: "Santa Teresa de Ávila", y: "1577", s: 10, cat: "Clásico católico", l: "es",
    an: "Obra mística cumbre de la Doctora de la Iglesia. Describe el camino del alma hacia Dios a través de siete moradas. Uno de los grandes textos del misticismo católico.",
    tags: ["Mística", "Oración", "Alma"], ref: "Doctora de la Iglesia, 1970"
  },
  {
    t: "Subida al Monte Carmelo", a: "San Juan de la Cruz", y: "1578", s: 10, cat: "Clásico católico", l: "es",
    an: "Tratado místico del Doctor de la Iglesia sobre la purificación del alma y la unión con Dios. Cumbre de la espiritualidad carmelita.",
    tags: ["Mística", "Purificación", "Unión con Dios"], ref: "Doctor de la Iglesia, 1926"
  },
  {
    t: "Dark Night of the Soul", a: "St. John of the Cross", y: "1578", s: 10, cat: "Catholic classic", l: "en",
    an: "Mystical treatise by a Doctor of the Church on the soul's purification and union with God. The summit of Carmelite spirituality.",
    tags: ["Mysticism", "Purification", "Union with God"], ref: "Doctor of the Church, 1926"
  },
  {
    t: "Diálogos", a: "Santa Catalina de Siena", y: "1378", s: 10, cat: "Clásico católico", l: "es",
    an: "Obra dictada místicamente por la Doctora de la Iglesia. Diálogo del alma con Dios sobre la providencia, la oración y la virtud.",
    tags: ["Mística", "Providencia", "Virtud"], ref: "Doctora de la Iglesia, 1970"
  },
  {
    t: "The Everlasting Man", a: "G.K. Chesterton", y: "1925", s: 9, cat: "Catholic classic", l: "en",
    an: "Chesterton's vision of world history through a Catholic lens. Cited by C.S. Lewis as key to his own conversion to Christianity.",
    tags: ["History", "Apologetics", "Faith"], ref: "Catholic intellectual tradition"
  },
  {
    t: "El Hombre Eterno", a: "G.K. Chesterton", y: "1925", s: 9, cat: "Clásico católico", l: "es",
    an: "Visión de la historia universal desde una perspectiva católica. C.S. Lewis la citó como clave en su propia conversión al cristianismo.",
    tags: ["Historia", "Apologética", "Fe"], ref: "Tradición intelectual católica"
  },
  {
    t: "Brideshead Revisited", a: "Evelyn Waugh", y: "1945", s: 8, cat: "Catholic classic", l: "en",
    an: "Novel by a Catholic convert exploring faith, grace and the aristocratic English Catholic world. Widely praised by Catholic literary critics for its theological depth.",
    tags: ["Grace", "Faith", "Conversion"], ref: "Catholic literary tradition"
  },
  {
    t: "El poder y la gloria", a: "Graham Greene", y: "1940", s: 8, cat: "Clásico católico", l: "es",
    an: "Novela de un católico practicante sobre un sacerdote perseguido en México anticlerical. Profunda meditación sobre la gracia, el pecado y la fidelidad a la vocación.",
    tags: ["Gracia", "Sacerdocio", "Persecución"], ref: "Tradición literaria católica"
  },
  {
    t: "The Power and the Glory", a: "Graham Greene", y: "1940", s: 8, cat: "Catholic classic", l: "en",
    an: "Novel by a devout Catholic about a priest hunted in anti-clerical Mexico. A profound meditation on grace, sin and fidelity to vocation.",
    tags: ["Grace", "Priesthood", "Persecution"], ref: "Catholic literary tradition"
  },

  // NOVELAS HISTÓRICAS SOBRE LA IGLESIA
  {
    t: "Quo Vadis", a: "Henryk Sienkiewicz", y: "1896", s: 9, cat: "Novela histórica", l: "es",
    an: "Novela histórica sobre los primeros cristianos en Roma bajo Nerón. Premio Nobel 1905. Retrata el martirio y la fe con profunda simpatía católica.",
    tags: ["Primeros cristianos", "Martirio", "Roma"], ref: "Premio Nobel Literatura 1905"
  },
  {
    t: "Quo Vadis", a: "Henryk Sienkiewicz", y: "1896", s: 9, cat: "Historical novel", l: "en",
    an: "Historical novel about the first Christians in Rome under Nero. Nobel Prize 1905. Portrays martyrdom and faith with deep Catholic sympathy.",
    tags: ["Early Christians", "Martyrdom", "Rome"], ref: "Nobel Prize Literature 1905"
  },
  {
    t: "El último Cátaro", a: "Antonio Gala", y: "1999", s: 4, cat: "Novela histórica", l: "es",
    an: "Novela sobre la herejía cátara y la Inquisición. Presenta una visión crítica de la Iglesia medieval. Históricamente contextualizada pero con simpatía hacia los herejes.",
    tags: ["Inquisición", "Herejía", "Medioevo"], ref: "Análisis histórico literario"
  },
  {
    t: "La Catedral del Mar", a: "Ildefonso Falcones", y: "2006", s: 5, cat: "Novela histórica", l: "es",
    an: "Novela histórica sobre la construcción de Santa María del Mar en Barcelona medieval. Retrata la Iglesia con luces y sombras. Compatible con la fe aunque no es obra religiosa.",
    tags: ["Medioevo", "Barcelona", "Iglesia"], ref: "Análisis literario general"
  },
  {
    t: "The Name of the Rose", a: "Umberto Eco", y: "1980", s: 5, cat: "Historical novel", l: "en",
    an: "Historical mystery set in a medieval monastery. Eco was agnostic but the novel does not directly attack the faith. Presents both corrupt and virtuous clergy.",
    tags: ["History", "Middle Ages", "Mystery"], ref: "General literary analysis"
  },
  {
    t: "Anya", a: "Susan Fromberg Schaeffer", y: "1974", s: 6, cat: "Historical novel", l: "en",
    an: "Novel about the Holocaust that raises deep questions about God, suffering and human dignity. Compatible with Catholic reflection on theodicy and the dignity of the human person.",
    tags: ["Holocaust", "Suffering", "Dignity"], ref: "Catholic Social Teaching"
  },
  {
    t: "Los Borgia", a: "Mario Puzo", y: "2001", s: 3, cat: "Novela histórica", l: "es",
    an: "Novela sobre la familia papal Borgia que retrata la corrupción eclesiástica del Renacimiento. Aunque histórica, presenta una visión muy negativa de la institución de la Iglesia.",
    tags: ["Corrupción", "Renacimiento", "Papado"], ref: "Análisis histórico literario"
  },

  // AUTOAYUDA Y NEW AGE
  {
    t: "El Poder del Ahora", a: "Eckhart Tolle", y: "1997", s: 2, cat: "New Age", l: "es",
    an: "Propone una espiritualidad sincretista centrada en el 'yo presente' sin referencia a Dios personal ni a la redención. Incompatible con la visión cristiana de la persona y la salvación.",
    tags: ["New Age", "Sincretismo", "Budismo"], ref: "Contrario a CIC 27, 1700"
  },
  {
    t: "The Power of Now", a: "Eckhart Tolle", y: "1997", s: 2, cat: "New Age", l: "en",
    an: "Proposes a syncretic spirituality centred on the 'present self' with no reference to a personal God or redemption. Incompatible with the Christian vision of the person and salvation.",
    tags: ["New Age", "Syncretism", "Buddhism"], ref: "Contrary to CCC 27, 1700"
  },
  {
    t: "Un Curso de Milagros", a: "Helen Schucman", y: "1976", s: 1, cat: "New Age", l: "es",
    an: "Presentado como dictado por Jesús, redefine conceptos cristianos desde una perspectiva gnóstica: niega el pecado, la redención y la realidad del mal. Directamente incompatible con la doctrina católica.",
    tags: ["Gnosticismo", "New Age", "Falsa revelación"], ref: "Contrario a Dei Verbum, CIC 67"
  },
  {
    t: "A Course in Miracles", a: "Helen Schucman", y: "1976", s: 1, cat: "New Age", l: "en",
    an: "Claimed to be dictated by Jesus, it redefines Christian concepts from a Gnostic perspective: denies sin, redemption and the reality of evil. Directly incompatible with Catholic doctrine.",
    tags: ["Gnosticism", "New Age", "False revelation"], ref: "Contrary to Dei Verbum, CCC 67"
  },
  {
    t: "Los Cuatro Acuerdos", a: "Miguel Ruiz", y: "1997", s: 2, cat: "New Age", l: "es",
    an: "Basado en la espiritualidad tolteca. Propone una ética sin referencia a Dios ni a la ley moral objetiva. Incompatible con la moral católica aunque algunos principios son superficialmente compatibles.",
    tags: ["New Age", "Espiritualidad tolteca", "Relativismo moral"], ref: "Contrario a Veritatis Splendor"
  },
  {
    t: "The Four Agreements", a: "Miguel Ruiz", y: "1997", s: 2, cat: "New Age", l: "en",
    an: "Based on Toltec spirituality. Proposes an ethics with no reference to God or objective moral law. Incompatible with Catholic morality though some principles are superficially compatible.",
    tags: ["New Age", "Toltec spirituality", "Moral relativism"], ref: "Contrary to Veritatis Splendor"
  },
  {
    t: "Conversaciones con Dios", a: "Neale Donald Walsch", y: "1995", s: 1, cat: "New Age", l: "es",
    an: "Pretende ser un diálogo directo con Dios que contradice sistemáticamente la revelación cristiana: niega el infierno, el pecado y la autoridad de la Iglesia. Directamente contrario a la fe católica.",
    tags: ["Falsa revelación", "New Age", "Gnosticismo"], ref: "Contrario a Dei Verbum, CIC 67"
  },
  {
    t: "Conversations with God", a: "Neale Donald Walsch", y: "1995", s: 1, cat: "New Age", l: "en",
    an: "Claims to be a direct dialogue with God that systematically contradicts Christian revelation: denies hell, sin and the authority of the Church. Directly contrary to Catholic faith.",
    tags: ["False revelation", "New Age", "Gnosticism"], ref: "Contrary to Dei Verbum, CCC 67"
  },
  {
    t: "El Hombre en Busca de Sentido", a: "Viktor Frankl", y: "1946", s: 7, cat: "Ambiguo", l: "es",
    an: "Memoria del Holocausto y fundamento de la logoterapia. Frankl era judío pero su visión del sentido, el sufrimiento y la dignidad humana es compatible con la antropología cristiana.",
    tags: ["Sentido", "Sufrimiento", "Dignidad"], ref: "Compatible con antropología cristiana"
  },
  {
    t: "Man's Search for Meaning", a: "Viktor Frankl", y: "1946", s: 7, cat: "Ambiguous", l: "en",
    an: "Holocaust memoir and foundation of logotherapy. Frankl was Jewish but his vision of meaning, suffering and human dignity is compatible with Christian anthropology.",
    tags: ["Meaning", "Suffering", "Dignity"], ref: "Compatible with Christian anthropology"
  },
  {
    t: "Despertando al Gigante Interior", a: "Tony Robbins", y: "1991", s: 2, cat: "New Age", l: "es",
    an: "Autoayuda basada en el poder ilimitado del individuo. Visión antropológica que prescinde de Dios y coloca al yo como fuente de toda transformación. Incompatible con la visión cristiana de la gracia.",
    tags: ["Autoayuda", "Individualismo", "New Age"], ref: "Contrario a CIC 1700, 2559"
  },
  {
    t: "Awaken the Giant Within", a: "Tony Robbins", y: "1991", s: 2, cat: "New Age", l: "en",
    an: "Self-help based on the unlimited power of the individual. An anthropological vision that dispenses with God and places the self as the source of all transformation. Incompatible with the Christian vision of grace.",
    tags: ["Self-help", "Individualism", "New Age"], ref: "Contrary to CCC 1700, 2559"
  },

  // MÁS BESTSELLERS AMBIGUOS Y CRÍTICOS
  {
    t: "El Principio del Fin", a: "Tim LaHaye y Jerry Jenkins", y: "1995", s: 4, cat: "Ambiguo", l: "es",
    an: "Serie de novelas evangélicas sobre el Apocalipsis. Desde la perspectiva católica, el Rapto tal como se describe no es doctrina católica. Lectura interesante pero teológicamente divergente.",
    tags: ["Apocalipsis", "Protestantismo", "Escatología"], ref: "Diverge de escatología católica"
  },
  {
    t: "Left Behind", a: "Tim LaHaye & Jerry Jenkins", y: "1995", s: 4, cat: "Ambiguous", l: "en",
    an: "Evangelical novel series about the Apocalypse. The Rapture as described is not Catholic doctrine. Interesting read but theologically divergent from Catholic eschatology.",
    tags: ["Apocalypse", "Protestantism", "Eschatology"], ref: "Diverges from Catholic eschatology"
  },
  {
    t: "El Retrato de Dorian Gray", a: "Oscar Wilde", y: "1890", s: 4, cat: "Ambiguo", l: "es",
    an: "Wilde se convirtió al catolicismo en su lecho de muerte. La novela es una parábola moral sobre el pecado y sus consecuencias, compatible con la visión católica aunque explora el hedonismo.",
    tags: ["Pecado", "Hedonismo", "Moralidad"], ref: "Conversión de Wilde al catolicismo"
  },
  {
    t: "The Picture of Dorian Gray", a: "Oscar Wilde", y: "1890", s: 4, cat: "Ambiguous", l: "en",
    an: "Wilde converted to Catholicism on his deathbed. The novel is a moral parable about sin and its consequences, compatible with the Catholic vision though it explores hedonism.",
    tags: ["Sin", "Hedonism", "Morality"], ref: "Wilde's conversion to Catholicism"
  },
  {
    t: "El Gran Gatsby", a: "F. Scott Fitzgerald", y: "1925", s: 6, cat: "Ambiguo", l: "es",
    an: "Fitzgerald era católico. La novela critica el sueño americano y la vacuidad del materialismo, valores compatibles con la crítica católica al consumismo. Sin conflictos doctrinales directos.",
    tags: ["Materialismo", "Vanidad", "Crítica social"], ref: "Doctrina Social de la Iglesia"
  },
  {
    t: "The Great Gatsby", a: "F. Scott Fitzgerald", y: "1925", s: 6, cat: "Ambiguous", l: "en",
    an: "Fitzgerald was Catholic. The novel critiques the American dream and the emptiness of materialism — values compatible with the Catholic critique of consumerism. No direct doctrinal conflicts.",
    tags: ["Materialism", "Vanity", "Social critique"], ref: "Catholic Social Teaching"
  },
  {
    t: "Cien Años de Soledad", a: "Gabriel García Márquez", y: "1967", s: 5, cat: "Ambiguo", l: "es",
    an: "Obra cumbre del realismo mágico latinoamericano. García Márquez era agnóstico. La novela mezcla elementos religiosos con magia sin distinguirlos. Lectura neutral, sin ataque directo a la fe.",
    tags: ["Realismo mágico", "Religión popular", "Latinoamérica"], ref: "Análisis literario general"
  },
  {
    t: "One Hundred Years of Solitude", a: "Gabriel García Márquez", y: "1967", s: 5, cat: "Ambiguous", l: "en",
    an: "Masterpiece of Latin American magical realism. García Márquez was agnostic. The novel mixes religious elements with magic without distinguishing them. Neutral reading, no direct attack on faith.",
    tags: ["Magical realism", "Folk religion", "Latin America"], ref: "General literary analysis"
  },
  {
    t: "El Médico", a: "Noah Gordon", y: "1986", s: 5, cat: "Novela histórica", l: "es",
    an: "Novela histórica sobre un médico inglés en la Persia medieval. Retrata con respeto las tres grandes religiones monoteístas. Sin ataques directos a la fe católica.",
    tags: ["Historia", "Medicina medieval", "Religiones"], ref: "Análisis literario general"
  },
  {
    t: "The Physician", a: "Noah Gordon", y: "1986", s: 5, cat: "Historical novel", l: "en",
    an: "Historical novel about an English physician in medieval Persia. Portrays the three great monotheistic religions with respect. No direct attacks on Catholic faith.",
    tags: ["History", "Medieval medicine", "Religions"], ref: "General literary analysis"
  },
  {
    t: "El Monje que Vendió su Ferrari", a: "Robin Sharma", y: "1997", s: 2, cat: "New Age", l: "es",
    an: "Mezcla de budismo, hinduismo y autoayuda occidental. El camino espiritual propuesto prescinde de Dios y de la redención. Incompatible con la espiritualidad cristiana.",
    tags: ["New Age", "Budismo", "Autoayuda"], ref: "Contrario a Dominus Iesus"
  },
  {
    t: "The Monk Who Sold His Ferrari", a: "Robin Sharma", y: "1997", s: 2, cat: "New Age", l: "en",
    an: "Mix of Buddhism, Hinduism and Western self-help. The proposed spiritual path dispenses with God and redemption. Incompatible with Christian spirituality.",
    tags: ["New Age", "Buddhism", "Self-help"], ref: "Contrary to Dominus Iesus"
  },
  {
    t: "Mujercitas", a: "Louisa May Alcott", y: "1868", s: 8, cat: "Ambiguo", l: "es",
    an: "Novela de formación con sólidos valores cristianos protestantes: sacrificio, amor familiar, humildad y servicio. Plenamente compatible con la ética cristiana católica.",
    tags: ["Familia", "Virtud", "Formación"], ref: "Compatible con ética cristiana"
  },
  {
    t: "Little Women", a: "Louisa May Alcott", y: "1868", s: 8, cat: "Ambiguous", l: "en",
    an: "Coming-of-age novel with solid Protestant Christian values: sacrifice, family love, humility and service. Fully compatible with Catholic Christian ethics.",
    tags: ["Family", "Virtue", "Formation"], ref: "Compatible with Christian ethics"
  },
  {
    t: "El Diario de Ana Frank", a: "Anne Frank", y: "1947", s: 7, cat: "Ambiguo", l: "es",
    an: "Testimonio del Holocausto que defiende la dignidad humana y la esperanza en medio del horror. Compatible con la doctrina social católica. Sin conflictos doctrinales.",
    tags: ["Dignidad", "Esperanza", "Holocausto"], ref: "Doctrina Social de la Iglesia"
  },
  {
    t: "The Diary of a Young Girl", a: "Anne Frank", y: "1947", s: 7, cat: "Ambiguous", l: "en",
    an: "Holocaust testimony defending human dignity and hope in the face of horror. Compatible with Catholic social teaching. No doctrinal conflicts.",
    tags: ["Dignity", "Hope", "Holocaust"], ref: "Catholic Social Teaching"
  },
  {
    t: "Dune", a: "Frank Herbert", y: "1965", s: 4, cat: "Ambiguo", l: "es",
    an: "Ciencia ficción que explora religión, poder y ecología. Herbert construye un universo con elementos de múltiples tradiciones religiosas. Lectura neutral aunque la religión se presenta de forma funcional, no trascendente.",
    tags: ["Ciencia ficción", "Religión", "Poder"], ref: "Análisis literario general"
  },
  {
    t: "Dune", a: "Frank Herbert", y: "1965", s: 4, cat: "Ambiguous", l: "en",
    an: "Science fiction exploring religion, power and ecology. Herbert builds a universe with elements from multiple religious traditions. Neutral reading though religion is presented functionally, not transcendently.",
    tags: ["Science fiction", "Religion", "Power"], ref: "General literary analysis"
  },
];
