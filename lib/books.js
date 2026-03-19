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
  },// CLÁSICOS DE LITERATURA UNIVERSAL
  {
    t: "Don Quijote de la Mancha", a: "Miguel de Cervantes", y: "1605", s: 8, cat: "Literatura universal", l: "es",
    an: "Cervantes era católico practicante y la obra refleja la cosmovisión cristiana de la España del Siglo de Oro. La fe, la caballería y la virtud son ejes centrales. Sin conflictos doctrinales.",
    tags: ["Virtud", "Fe", "Literatura española"], ref: "Tradición literaria católica española"
  },
  {
    t: "Don Quixote", a: "Miguel de Cervantes", y: "1605", s: 8, cat: "Universal literature", l: "en",
    an: "Cervantes was a practising Catholic and the work reflects the Christian worldview of Golden Age Spain. Faith, chivalry and virtue are central themes. No doctrinal conflicts.",
    tags: ["Virtue", "Faith", "Spanish literature"], ref: "Spanish Catholic literary tradition"
  },
  {
    t: "Los Miserables", a: "Victor Hugo", y: "1862", s: 8, cat: "Literatura universal", l: "es",
    an: "Profunda meditación sobre la redención, la misericordia y la justicia. El personaje del obispo Myriel encarna la caridad cristiana. Hugo era deísta pero los valores de la novela son compatibles con la doctrina católica.",
    tags: ["Redención", "Misericordia", "Justicia"], ref: "Compatible con doctrina social católica"
  },
  {
    t: "Les Misérables", a: "Victor Hugo", y: "1862", s: 8, cat: "Universal literature", l: "en",
    an: "A profound meditation on redemption, mercy and justice. The character of Bishop Myriel embodies Christian charity. Hugo was a deist but the novel's values are compatible with Catholic doctrine.",
    tags: ["Redemption", "Mercy", "Justice"], ref: "Compatible with Catholic social doctrine"
  },
  {
    t: "Anna Karenina", a: "León Tolstói", y: "1878", s: 6, cat: "Literatura universal", l: "es",
    an: "Tolstói exploró profundamente la moral cristiana aunque terminó alejándose de la Iglesia Ortodoxa. La novela retrata las consecuencias del adulterio y la búsqueda de sentido. Lectura con matices pero sin ataque directo a la fe.",
    tags: ["Moral", "Matrimonio", "Consecuencias del pecado"], ref: "Análisis literario católico"
  },
  {
    t: "Anna Karenina", a: "Leo Tolstoy", y: "1878", s: 6, cat: "Universal literature", l: "en",
    an: "Tolstoy explored Christian morality deeply though he eventually distanced himself from the Orthodox Church. The novel portrays the consequences of adultery and the search for meaning.",
    tags: ["Morality", "Marriage", "Consequences of sin"], ref: "Catholic literary analysis"
  },
  {
    t: "Guerra y Paz", a: "León Tolstói", y: "1869", s: 7, cat: "Literatura universal", l: "es",
    an: "Épica novela histórica con profundas reflexiones sobre la providencia, la muerte y el sentido de la vida. Los personajes buscan a Dios a su manera. Compatible con la reflexión cristiana aunque Tolstói tenía una visión heterodoxa.",
    tags: ["Providencia", "Muerte", "Sentido de la vida"], ref: "Análisis literario general"
  },
  {
    t: "War and Peace", a: "Leo Tolstoy", y: "1869", s: 7, cat: "Universal literature", l: "en",
    an: "Epic historical novel with deep reflections on providence, death and the meaning of life. Characters seek God in their own way. Compatible with Christian reflection though Tolstoy had a heterodox view.",
    tags: ["Providence", "Death", "Meaning of life"], ref: "General literary analysis"
  },
  {
    t: "El Proceso", a: "Franz Kafka", y: "1925", s: 4, cat: "Literatura universal", l: "es",
    an: "Alegoría sobre la burocracia y la culpa sin redención. Kafka era agnóstico. La novela retrata un mundo sin gracia ni salvación, visión incompatible con la esperanza cristiana aunque literariamente valiosa.",
    tags: ["Culpa", "Burocracia", "Absurdo"], ref: "Análisis literario general"
  },
  {
    t: "The Trial", a: "Franz Kafka", y: "1925", s: 4, cat: "Universal literature", l: "en",
    an: "Allegory of bureaucracy and guilt without redemption. Kafka was agnostic. The novel portrays a world without grace or salvation, a vision incompatible with Christian hope though literarily valuable.",
    tags: ["Guilt", "Bureaucracy", "Absurd"], ref: "General literary analysis"
  },
  {
    t: "Crimen y Castigo", a: "Fiódor Dostoievski", y: "1866", s: 9, cat: "Literatura universal", l: "es",
    an: "Exploración profundamente cristiana del pecado, la culpa, la redención y el poder transformador del sufrimiento y el amor. Dostoievski era ortodoxo devoto. Muy recomendada por pensadores católicos.",
    tags: ["Pecado", "Redención", "Sufrimiento"], ref: "Tradición literaria cristiana"
  },
  {
    t: "El Idiota", a: "Fiódor Dostoievski", y: "1869", s: 8, cat: "Literatura universal", l: "es",
    an: "El príncipe Myshkin es una figura cristiana por excelencia: bondad pura en un mundo corrupto. Dostoievski explora la santidad y el sufrimiento inocente desde una profunda perspectiva cristiana.",
    tags: ["Santidad", "Bondad", "Sufrimiento inocente"], ref: "Tradición literaria cristiana"
  },
  {
    t: "The Idiot", a: "Fyodor Dostoevsky", y: "1869", s: 8, cat: "Universal literature", l: "en",
    an: "Prince Myshkin is a quintessentially Christian figure: pure goodness in a corrupt world. Dostoevsky explores holiness and innocent suffering from a deep Christian perspective.",
    tags: ["Holiness", "Goodness", "Innocent suffering"], ref: "Christian literary tradition"
  },
  {
    t: "Los Hermanos Karamázov", a: "Fiódor Dostoievski", y: "1880", s: 9, cat: "Literatura universal", l: "es",
    an: "Considerada la cumbre de Dostoievski. Debate profundo sobre la existencia de Dios, el sufrimiento, la fe y la redención. El padre Zósima encarna la espiritualidad cristiana ortodoxa. Muy recomendada.",
    tags: ["Existencia de Dios", "Fe", "Redención"], ref: "Tradición literaria cristiana"
  },
  {
    t: "The Brothers Karamazov", a: "Fyodor Dostoevsky", y: "1880", s: 9, cat: "Universal literature", l: "en",
    an: "Considered Dostoevsky's masterpiece. A profound debate on the existence of God, suffering, faith and redemption. Father Zosima embodies Christian Orthodox spirituality. Highly recommended.",
    tags: ["Existence of God", "Faith", "Redemption"], ref: "Christian literary tradition"
  },
  {
    t: "Madame Bovary", a: "Gustave Flaubert", y: "1857", s: 3, cat: "Literatura universal", l: "es",
    an: "Retrato del adulterio y la insatisfacción burguesa. Flaubert era agnóstico y la novela critica implícitamente los valores religiosos de provincia. Sin condena directa pero con visión moral incompatible.",
    tags: ["Adulterio", "Insatisfacción", "Moral"], ref: "Análisis literario católico"
  },
  {
    t: "Madame Bovary", a: "Gustave Flaubert", y: "1857", s: 3, cat: "Universal literature", l: "en",
    an: "Portrait of adultery and bourgeois dissatisfaction. Flaubert was agnostic and the novel implicitly critiques provincial religious values. No direct condemnation but morally incompatible vision.",
    tags: ["Adultery", "Dissatisfaction", "Morality"], ref: "Catholic literary analysis"
  },
  {
    t: "El Extranjero", a: "Albert Camus", y: "1942", s: 2, cat: "Literatura universal", l: "es",
    an: "Manifiesto del absurdismo: la vida carece de sentido y Dios no existe. El protagonista rechaza explícitamente la consolación religiosa antes de morir. Directamente contrario a la esperanza cristiana.",
    tags: ["Absurdismo", "Ateísmo", "Nihilismo"], ref: "Contrario a CIC 27, 1817"
  },
  {
    t: "The Stranger", a: "Albert Camus", y: "1942", s: 2, cat: "Universal literature", l: "en",
    an: "Manifesto of absurdism: life is meaningless and God does not exist. The protagonist explicitly rejects religious consolation before dying. Directly contrary to Christian hope.",
    tags: ["Absurdism", "Atheism", "Nihilism"], ref: "Contrary to CCC 27, 1817"
  },
  {
    t: "El Mito de Sísifo", a: "Albert Camus", y: "1942", s: 2, cat: "Literatura universal", l: "es",
    an: "Ensayo filosófico que desarrolla el absurdismo y rechaza explícitamente la fe religiosa como 'salto filosófico ilegítimo'. Incompatible con la visión cristiana del sentido de la vida.",
    tags: ["Absurdismo", "Ateísmo", "Filosofía"], ref: "Contrario a CIC 27, 1817"
  },
  {
    t: "En Busca del Tiempo Perdido", a: "Marcel Proust", y: "1913–1927", s: 5, cat: "Literatura universal", l: "es",
    an: "Monumental obra sobre la memoria y el tiempo. Proust era agnóstico pero la novela no ataca la fe directamente. Contiene referencias religiosas y reflexiones sobre la trascendencia. Lectura neutral.",
    tags: ["Memoria", "Tiempo", "Trascendencia"], ref: "Análisis literario general"
  },

  // FILOSOFÍA
  {
    t: "La República", a: "Platón", y: "380 a.C.", s: 6, cat: "Filosofía", l: "es",
    an: "Obra fundacional de la filosofía occidental. Platón influyó decisivamente en el pensamiento cristiano a través de Agustín y otros Padres. La búsqueda del Bien y la justicia es compatible con la ética cristiana.",
    tags: ["Justicia", "Bien", "Filosofía clásica"], ref: "Base de la filosofía cristiana"
  },
  {
    t: "The Republic", a: "Plato", y: "380 BC", s: 6, cat: "Philosophy", l: "en",
    an: "Foundational work of Western philosophy. Plato decisively influenced Christian thought through Augustine and other Fathers. The search for the Good and justice is compatible with Christian ethics.",
    tags: ["Justice", "Good", "Classical philosophy"], ref: "Foundation of Christian philosophy"
  },
  {
    t: "Ética a Nicómaco", a: "Aristóteles", y: "350 a.C.", s: 7, cat: "Filosofía", l: "es",
    an: "Fundamento de la ética tomista. Tomás de Aquino integró la ética aristotélica en la moral católica. La búsqueda de la virtud y el bien humano es compatible y complementaria con la moral cristiana.",
    tags: ["Virtud", "Ética", "Bien humano"], ref: "Base de la ética tomista, Aeterni Patris"
  },
  {
    t: "Nicomachean Ethics", a: "Aristotle", y: "350 BC", s: 7, cat: "Philosophy", l: "en",
    an: "Foundation of Thomistic ethics. Thomas Aquinas integrated Aristotelian ethics into Catholic morality. The pursuit of virtue and human good is compatible and complementary to Christian morality.",
    tags: ["Virtue", "Ethics", "Human good"], ref: "Foundation of Thomistic ethics, Aeterni Patris"
  },
  {
    t: "Meditaciones", a: "Marco Aurelio", y: "180 d.C.", s: 6, cat: "Filosofía", l: "es",
    an: "Reflexiones estoicas sobre la virtud, el deber y la providencia. El estoicismo comparte valores con el cristianismo: autodominio, servicio, aceptación del sufrimiento. No es obra cristiana pero es compatible éticamente.",
    tags: ["Estoicismo", "Virtud", "Providencia"], ref: "Compatible con ética cristiana"
  },
  {
    t: "Meditations", a: "Marcus Aurelius", y: "180 AD", s: 6, cat: "Philosophy", l: "en",
    an: "Stoic reflections on virtue, duty and providence. Stoicism shares values with Christianity: self-mastery, service, acceptance of suffering. Not a Christian work but ethically compatible.",
    tags: ["Stoicism", "Virtue", "Providence"], ref: "Compatible with Christian ethics"
  },
  {
    t: "Crítica de la Razón Pura", a: "Immanuel Kant", y: "1781", s: 4, cat: "Filosofía", l: "es",
    an: "Kant limita el conocimiento racional de Dios aunque lo postula como necesidad moral. Su crítica a los argumentos tradicionales de la existencia de Dios es problemática para la teología natural católica.",
    tags: ["Teología natural", "Razón", "Conocimiento de Dios"], ref: "Contrario a CIC 36, Fides et Ratio"
  },
  {
    t: "Critique of Pure Reason", a: "Immanuel Kant", y: "1781", s: 4, cat: "Philosophy", l: "en",
    an: "Kant limits rational knowledge of God though he postulates God as a moral necessity. His critique of traditional arguments for God's existence is problematic for Catholic natural theology.",
    tags: ["Natural theology", "Reason", "Knowledge of God"], ref: "Contrary to CCC 36, Fides et Ratio"
  },
  {
    t: "El Ser y la Nada", a: "Jean-Paul Sartre", y: "1943", s: 1, cat: "Filosofía", l: "es",
    an: "Existencialismo ateo radical: la existencia precede a la esencia, Dios no existe y el hombre está condenado a ser libre sin referencia trascendente. Directamente contrario a la antropología católica.",
    tags: ["Existencialismo", "Ateísmo", "Libertad sin Dios"], ref: "Contrario a CIC 27, GS 19"
  },
  {
    t: "Being and Nothingness", a: "Jean-Paul Sartre", y: "1943", s: 1, cat: "Philosophy", l: "en",
    an: "Radical atheist existentialism: existence precedes essence, God does not exist and man is condemned to be free without transcendent reference. Directly contrary to Catholic anthropology.",
    tags: ["Existentialism", "Atheism", "Freedom without God"], ref: "Contrary to CCC 27, GS 19"
  },
  {
    t: "El Príncipe", a: "Nicolás Maquiavelo", y: "1532", s: 2, cat: "Filosofía", l: "es",
    an: "Separa radicalmente la política de la moral cristiana. El fin justifica los medios, principio explícitamente contrario a la doctrina moral católica. Fue incluido en el Índice de libros prohibidos.",
    tags: ["Política", "Moral", "El fin justifica los medios"], ref: "Incluido en el Índice de libros prohibidos"
  },
  {
    t: "The Prince", a: "Niccolò Machiavelli", y: "1532", s: 2, cat: "Philosophy", l: "en",
    an: "Radically separates politics from Christian morality. The end justifies the means — a principle explicitly contrary to Catholic moral doctrine. Was placed on the Index of Forbidden Books.",
    tags: ["Politics", "Morality", "End justifies means"], ref: "Placed on the Index of Forbidden Books"
  },
  {
    t: "Fides et Ratio", a: "Papa Juan Pablo II", y: "1998", s: 10, cat: "Filosofía", l: "es",
    an: "Encíclica sobre la relación entre fe y razón. Defiende que la filosofía y la teología no se oponen sino que se complementan. Referencia fundamental del Magisterio sobre el pensamiento filosófico católico.",
    tags: ["Fe", "Razón", "Filosofía cristiana"], ref: "Encíclica papal"
  },
  {
    t: "Fides et Ratio", a: "Pope John Paul II", y: "1998", s: 10, cat: "Philosophy", l: "en",
    an: "Encyclical on the relationship between faith and reason. Defends that philosophy and theology do not oppose but complement each other. A fundamental Magisterium reference on Catholic philosophical thought.",
    tags: ["Faith", "Reason", "Christian philosophy"], ref: "Papal encyclical"
  },
  {
    t: "El Antimanual de Filosofía", a: "Michel Onfray", y: "2001", s: 1, cat: "Filosofía", l: "es",
    an: "Onfray es militantemente ateo y anticristiano. Sus obras atacan sistemáticamente el cristianismo como fuente de represión y oscurantismo. Directamente contrario a la fe católica.",
    tags: ["Ateísmo", "Anti-cristiano", "Materialismo"], ref: "Contrario a CIC 2089"
  },
  {
    t: "Tratado de la Naturaleza Humana", a: "David Hume", y: "1739", s: 3, cat: "Filosofía", l: "es",
    an: "Empirismo radical que niega la causalidad necesaria y socava los argumentos tradicionales para la existencia de Dios. Hume fue el gran crítico de la teología natural. Problemático para la fe católica.",
    tags: ["Empirismo", "Escepticismo", "Teología natural"], ref: "Contrario a CIC 36, Fides et Ratio"
  },
  {
    t: "A Treatise of Human Nature", a: "David Hume", y: "1739", s: 3, cat: "Philosophy", l: "en",
    an: "Radical empiricism that denies necessary causality and undermines traditional arguments for God's existence. Hume was the great critic of natural theology. Problematic for Catholic faith.",
    tags: ["Empiricism", "Scepticism", "Natural theology"], ref: "Contrary to CCC 36, Fides et Ratio"
  },

  // CIENCIA Y FE
  {
    t: "El Gen Egoísta", a: "Richard Dawkins", y: "1976", s: 3, cat: "Ciencia y fe", l: "es",
    an: "Obra científica sobre la evolución génica. En sí misma es compatible con la fe aunque Dawkins la usa como base para su materialismo ateo. La teoría evolutiva no es condenada por la Iglesia.",
    tags: ["Evolución", "Genética", "Materialismo"], ref: "CIC 283, Juan Pablo II (1996)"
  },
  {
    t: "The Selfish Gene", a: "Richard Dawkins", y: "1976", s: 3, cat: "Science and faith", l: "en",
    an: "Scientific work on gene evolution. Compatible with faith in itself though Dawkins uses it as a basis for atheistic materialism. Evolutionary theory is not condemned by the Church.",
    tags: ["Evolution", "Genetics", "Materialism"], ref: "CCC 283, John Paul II (1996)"
  },
  {
    t: "Breve Historia del Tiempo", a: "Stephen Hawking", y: "1988", s: 5, cat: "Ciencia y fe", l: "es",
    an: "Divulgación científica sobre el origen del universo. Hawking era agnóstico pero la obra no ataca directamente la fe. La famosa frase sobre 'no necesitar a Dios' es filosófica, no científica. Lectura neutral.",
    tags: ["Cosmología", "Origen del universo", "Ciencia"], ref: "CIC 283, Gaudium et Spes 36"
  },
  {
    t: "A Brief History of Time", a: "Stephen Hawking", y: "1988", s: 5, cat: "Science and faith", l: "en",
    an: "Popular science on the origin of the universe. Hawking was agnostic but the work does not directly attack faith. The famous remark about not needing God is philosophical, not scientific. Neutral reading.",
    tags: ["Cosmology", "Origin of universe", "Science"], ref: "CCC 283, Gaudium et Spes 36"
  },
  {
    t: "El Lenguaje de Dios", a: "Francis Collins", y: "2006", s: 9, cat: "Ciencia y fe", l: "es",
    an: "El director del Proyecto Genoma Humano defiende que la ciencia y la fe cristiana son completamente compatibles. Testimonio personal de conversión al cristianismo desde el ateísmo. Muy recomendado.",
    tags: ["Ciencia y fe", "Evolución", "Conversión"], ref: "Plenamente compatible con CIC 283"
  },
  {
    t: "The Language of God", a: "Francis Collins", y: "2006", s: 9, cat: "Science and faith", l: "en",
    an: "The director of the Human Genome Project argues that science and Christian faith are fully compatible. Personal testimony of conversion to Christianity from atheism. Highly recommended.",
    tags: ["Science and faith", "Evolution", "Conversion"], ref: "Fully compatible with CCC 283"
  },
  {
    t: "Dios y la Nueva Física", a: "Paul Davies", y: "1983", s: 6, cat: "Ciencia y fe", l: "es",
    an: "Davies explora las implicaciones filosóficas y religiosas de la física moderna. No es cristiano pero defiende que la ciencia apunta hacia un diseño inteligente. Lectura compatible con la reflexión teológica.",
    tags: ["Física", "Diseño inteligente", "Cosmología"], ref: "Compatible con CIC 286"
  },
  {
    t: "God and the New Physics", a: "Paul Davies", y: "1983", s: 6, cat: "Science and faith", l: "en",
    an: "Davies explores the philosophical and religious implications of modern physics. Not Christian but argues that science points toward intelligent design. Compatible with theological reflection.",
    tags: ["Physics", "Intelligent design", "Cosmology"], ref: "Compatible with CCC 286"
  },
  {
    t: "Ciencia y Religión", a: "John Polkinghorne", y: "1998", s: 9, cat: "Ciencia y fe", l: "es",
    an: "Polkinghorne es físico teórico y sacerdote anglicano. Defiende con rigor académico la compatibilidad entre física cuántica y fe cristiana. Plenamente compatible con la visión católica de la relación fe-razón.",
    tags: ["Física cuántica", "Fe", "Razón"], ref: "Compatible con Fides et Ratio"
  },
  {
    t: "Science and Religion", a: "John Polkinghorne", y: "1998", s: 9, cat: "Science and faith", l: "en",
    an: "Polkinghorne is a theoretical physicist and Anglican priest. Rigorously defends the compatibility between quantum physics and Christian faith. Fully compatible with the Catholic vision of faith-reason.",
    tags: ["Quantum physics", "Faith", "Reason"], ref: "Compatible with Fides et Ratio"
  },
  {
    t: "El Diseño de la Existencia", a: "Michael Behe", y: "1996", s: 7, cat: "Ciencia y fe", l: "es",
    an: "Bioquímico católico que defiende el diseño inteligente desde la biología molecular. La Iglesia no ha condenado el diseño inteligente aunque tampoco lo ha adoptado oficialmente. Lectura interesante para católicos.",
    tags: ["Diseño inteligente", "Biología", "Fe"], ref: "No condenado por el Magisterio"
  },
  {
    t: "Darwin's Black Box", a: "Michael Behe", y: "1996", s: 7, cat: "Science and faith", l: "en",
    an: "Catholic biochemist defending intelligent design from molecular biology. The Church has not condemned intelligent design though it has not officially adopted it either. Interesting reading for Catholics.",
    tags: ["Intelligent design", "Biology", "Faith"], ref: "Not condemned by the Magisterium"
  },
  {
    t: "La Gran Ilusión", a: "Richard Dawkins", y: "2006", s: 1, cat: "Ciencia y fe", l: "es",
    an: "Ataque sistemático a la religión usando argumentos científicos. Dawkins argumenta que la fe es una ilusión peligrosa y que la ciencia la hace innecesaria. Directamente contrario a la fe católica.",
    tags: ["Ateísmo", "Anti-religión", "Ciencia"], ref: "Contrario a CIC 31, 36"
  },
  {
    t: "El espejismo de Dios", a: "Richard Dawkins", y: "2006", s: 1, cat: "Ciencia y fe", l: "es",
    an: "Crítica directa a la creencia en Dios desde el naturalismo científico. Presenta la religión como una ilusión perjudicial, en contradicción con la doctrina católica.",
    tags: ["Ateísmo", "Ciencia", "Crítica religión"], ref: "Contrario a CIC 31, 36"
  },
  {
    t: "Sapiens: De animales a dioses", a: "Yuval Noah Harari", y: "2011", s: 2, cat: "Historia y antropología", l: "es",
    an: "Interpreta la religión como construcción social y evolutiva. Ofrece ideas interesantes pero reduce la dimensión espiritual del ser humano.",
    tags: ["Historia", "Antropología", "Relativismo"], ref: "Contrario a CIC 355, 366"
  },
  {
    t: "El código Da Vinci", a: "Dan Brown", y: "2003", s: 1, cat: "Ficción", l: "es",
    an: "Novela que presenta teorías conspirativas sobre Jesucristo y la Iglesia sin base histórica. Puede generar confusión sobre verdades centrales de la fe.",
    tags: ["Ficción", "Iglesia", "Conspiración"], ref: "Contrario a CIC 88, 495"
  },
  {
    t: "Cincuenta sombras de Grey", a: "E. L. James", y: "2011", s: 1, cat: "Moral sexual", l: "es",
    an: "Promueve una visión distorsionada de la sexualidad humana, centrada en el placer y relaciones de dominación. Incompatible con la visión cristiana del amor.",
    tags: ["Sexualidad", "Erotismo"], ref: "Contrario a CIC 2337, 2354"
  },
  {
    t: "El poder del ahora", a: "Eckhart Tolle", y: "1997", s: 2, cat: "Espiritualidad", l: "es",
    an: "Propone una espiritualidad centrada en la conciencia y el presente, con elementos cercanos al panteísmo. Puede ser compatible en parte, pero requiere discernimiento.",
    tags: ["New Age", "Espiritualidad"], ref: "Advertencia: CIC 2117"
  },
  {
    t: "Dios existe", a: "Antony Flew", y: "2007", s: 5, cat: "Filosofía", l: "es",
    an: "El autor, anteriormente ateo, defiende la existencia de Dios desde argumentos filosóficos. Compatible con la fe natural y útil como apoyo apologético.",
    tags: ["Apologética", "Filosofía"], ref: "Compatible con CIC 31"
  },
  {
    t: "Introducción al cristianismo", a: "Joseph Ratzinger", y: "1968", s: 5, cat: "Teología", l: "es",
    an: "Explicación profunda de la fe cristiana desde una perspectiva teológica sólida. Muy recomendable para comprender el Credo.",
    tags: ["Teología", "Doctrina"], ref: "Compatible con CIC"
  },
  {
    t: "Confesiones", a: "San Agustín", y: "397", s: 5, cat: "Espiritualidad", l: "es",
    an: "Obra clásica que narra la conversión y búsqueda de Dios. Referente fundamental de la espiritualidad cristiana.",
    tags: ["Santos", "Conversión"], ref: "Tradición de la Iglesia"
  },
  {
    t: "El alquimista", a: "Paulo Coelho", y: "1988", s: 2, cat: "Ficción espiritual", l: "es",
    an: "Presenta una espiritualidad difusa basada en el destino y la energía universal. Puede confundir la providencia divina con ideas esotéricas.",
    tags: ["Espiritualidad", "New Age"], ref: "Advertencia: CIC 2117"
  },
  {
    t: "Harry Potter y la piedra filosofal", a: "J. K. Rowling", y: "1997", s: 3, cat: "Ficción", l: "es",
    an: "Obra de fantasía con elementos mágicos. Generalmente considerada neutral si se entiende como ficción, aunque requiere acompañamiento en lectores jóvenes.",
    tags: ["Fantasía", "Magia"], ref: "Discernimiento prudencial CIC 2117"
  },
  {
    t: "Más allá del bien y del mal", a: "Friedrich Nietzsche", y: "1886", s: 1, cat: "Filosofía", l: "es",
    an: "Crítica radical a la moral cristiana y a la noción de verdad objetiva. Incompatible con la ética católica.",
    tags: ["Filosofía", "Relativismo"], ref: "Contrario a CIC 1955"
  },
  {
    t: "La abolición del hombre", a: "C. S. Lewis", y: "1943", s: 5, cat: "Filosofía moral", l: "es",
    an: "Defensa de la ley moral objetiva frente al relativismo. Muy alineado con la antropología cristiana.",
    tags: ["Moral", "Apologética"], ref: "Compatible con CIC 1954"
  },
  {
    t: "La asistenta", a: "Freida McFadden", y: "2022", s: 2, cat: "Thriller", l: "es",
    an: "Thriller psicológico centrado en secretos y manipulación. Puede incluir visiones morales ambiguas y oscuras.",
    tags: ["Thriller", "Psicología"], ref: "Discernimiento moral"
  },
  {
    t: "Alas de sangre", a: "Rebecca Yarros", y: "2023", s: 2, cat: "Fantasía", l: "es",
    an: "Fantasía romántica con violencia y sexualidad explícita. Puede presentar relaciones desordenadas.",
    tags: ["Fantasía", "Romance"], ref: "Advertencia: CIC 2354"
  },
  {
    t: "Alas de ónix", a: "Rebecca Yarros", y: "2025", s: 2, cat: "Fantasía", l: "es",
    an: "Continuación de saga con fuerte carga emocional y romántica. Elementos de magia y erotización.",
    tags: ["Fantasía", "Romance"], ref: "Advertencia: CIC 2117, 2354"
  },
  {
    t: "La muy catastrófica visita al zoo", a: "Joël Dicker", y: "2024", s: 4, cat: "Infantil", l: "es",
    an: "Historia accesible con valores familiares y educativos. Compatible en general.",
    tags: ["Infantil", "Familia"], ref: "Compatible"
  },
  {
    t: "Invisible", a: "Eloy Moreno", y: "2018", s: 4, cat: "Juvenil", l: "es",
    an: "Reflexión sobre el bullying y la dignidad humana. Compatible con valores cristianos.",
    tags: ["Juvenil", "Valores"], ref: "CIC 1930"
  },
  {
    t: "La biblioteca de la medianoche", a: "Matt Haig", y: "2020", s: 3, cat: "Ficción", l: "es",
    an: "Explora vidas alternativas sin referencia a Dios. Puede tender al relativismo existencial.",
    tags: ["Filosofía", "Existencialismo"], ref: "Discernimiento CIC 1700"
  },
  {
    t: "La paciente silenciosa", a: "Alex Michaelides", y: "2019", s: 2, cat: "Thriller", l: "es",
    an: "Thriller psicológico con temas de trauma y violencia. Moralidad ambigua.",
    tags: ["Thriller"], ref: "Discernimiento"
  },
  {
    t: "Sapiens", a: "Yuval Noah Harari", y: "2011", s: 2, cat: "Ensayo", l: "es",
    an: "Reduce la religión a construcción cultural. Niega dimensión espiritual trascendente.",
    tags: ["Historia", "Ateísmo"], ref: "Contrario a CIC 355"
  },
  {
    t: "Homo Deus", a: "Yuval Noah Harari", y: "2015", s: 1, cat: "Ensayo", l: "es",
    an: "Propone un futuro sin Dios donde el hombre se convierte en divinidad. Contrario a la visión cristiana.",
    tags: ["Transhumanismo"], ref: "Contrario a CIC 285"
  },
  {
    t: "Proyecto Hail Mary", a: "Andy Weir", y: "2021", s: 3, cat: "Ciencia ficción", l: "es",
    an: "Ciencia ficción centrada en la supervivencia humana sin referencia religiosa. Neutral.",
    tags: ["Ciencia ficción"], ref: "Neutral"
  },
  {
    t: "El alquimista", a: "Paulo Coelho", y: "1988", s: 2, cat: "Espiritualidad", l: "es",
    an: "Espiritualidad difusa con elementos de destino y energía universal. Riesgo de confusión doctrinal.",
    tags: ["New Age"], ref: "Advertencia CIC 2117"
  },
  {
    t: "El poder de los hábitos", a: "Charles Duhigg", y: "2012", s: 4, cat: "Autoayuda", l: "es",
    an: "Análisis científico del comportamiento humano. Compatible si se integra con visión moral.",
    tags: ["Psicología"], ref: "Compatible"
  },
  {
    t: "Hábitos atómicos", a: "James Clear", y: "2018", s: 5, cat: "Autoayuda", l: "es",
    an: "Fomenta disciplina y mejora personal. Compatible con la virtud cristiana.",
    tags: ["Virtud", "Disciplina"], ref: "CIC 1803"
  },
  {
    t: "Padre rico, padre pobre", a: "Robert Kiyosaki", y: "1997", s: 3, cat: "Finanzas", l: "es",
    an: "Promueve éxito económico. Puede derivar en materialismo si no se equilibra.",
    tags: ["Dinero"], ref: "Advertencia CIC 2424"
  },
  {
    t: "El monje que vendió su Ferrari", a: "Robin Sharma", y: "1997", s: 3, cat: "Autoayuda", l: "es",
    an: "Mezcla espiritualidad oriental con desarrollo personal. Requiere discernimiento.",
    tags: ["Espiritualidad"], ref: "Advertencia CIC 2117"
  },
  {
    t: "Cien años de soledad", a: "Gabriel García Márquez", y: "1967", s: 3, cat: "Literatura", l: "es",
    an: "Gran obra literaria con elementos mágicos. No doctrinal pero valiosa culturalmente.",
    tags: ["Realismo mágico"], ref: "Neutral"
  },
  {
    t: "1984", a: "George Orwell", y: "1949", s: 4, cat: "Distopía", l: "es",
    an: "Crítica al totalitarismo. Compatible con la defensa de la verdad y libertad.",
    tags: ["Política"], ref: "CIC 1730"
  },
  {
    t: "Un mundo feliz", a: "Aldous Huxley", y: "1932", s: 2, cat: "Distopía", l: "es",
    an: "Mundo sin Dios ni familia. Denuncia útil pero con visión antropológica problemática.",
    tags: ["Distopía"], ref: "Discernimiento"
  },
  {
    t: "Orgullo y prejuicio", a: "Jane Austen", y: "1813", s: 5, cat: "Clásico", l: "es",
    an: "Historia sobre amor, virtud y carácter. Altamente compatible.",
    tags: ["Clásico"], ref: "Compatible"
  },
  {
    t: "Los juegos del hambre", a: "Suzanne Collins", y: "2008", s: 3, cat: "Juvenil", l: "es",
    an: "Violencia y crítica social. Puede ser útil con acompañamiento.",
    tags: ["Juvenil"], ref: "Discernimiento"
  },
  {
    t: "Crepúsculo", a: "Stephenie Meyer", y: "2005", s: 2, cat: "Romance", l: "es",
    an: "Relación emocional intensa con elementos problemáticos. Idealización del amor posesivo.",
    tags: ["Romance"], ref: "CIC 2337"
  },
  {
    t: "It", a: "Stephen King", y: "1986", s: 1, cat: "Terror", l: "es",
    an: "Contenido explícito de violencia y sexualidad. No recomendable.",
    tags: ["Terror"], ref: "CIC 2354"
  },
  {
    t: "El señor de los anillos", a: "J.R.R. Tolkien", y: "1954", s: 5, cat: "Fantasía", l: "es",
    an: "Profundamente inspirado en valores cristianos como el sacrificio y el bien.",
    tags: ["Fantasía"], ref: "Compatible"
  },
  {
    t: "Crimen y castigo", a: "Fiódor Dostoyevski", y: "1866", s: 5, cat: "Clásico", l: "es",
    an: "Exploración del pecado, culpa y redención. Muy alineado con la visión cristiana.",
    tags: ["Redención"], ref: "Compatible CIC 1847"
  },
  {
    t: "It Ends With Us", a: "Colleen Hoover", y: "2016", s: 2, cat: "Romance", l: "es",
    an: "Relación marcada por abuso y emociones intensas. Puede normalizar dinámicas afectivas desordenadas.",
    tags: ["Romance", "Drama"], ref: "Discernimiento CIC 2337"
  },
  {
    t: "It Starts With Us", a: "Colleen Hoover", y: "2022", s: 2, cat: "Romance", l: "es",
    an: "Continuación centrada en relaciones sentimentales complejas con ambigüedad moral.",
    tags: ["Romance"], ref: "Discernimiento"
  },
  {
    t: "Ugly Love", a: "Colleen Hoover", y: "2014", s: 2, cat: "Romance", l: "es",
    an: "Historia con fuerte carga emocional y sexualidad explícita.",
    tags: ["Romance"], ref: "Advertencia CIC 2354"
  },
  {
    t: "Verity", a: "Colleen Hoover", y: "2018", s: 1, cat: "Thriller", l: "es",
    an: "Contenido oscuro con violencia psicológica y elementos sexuales explícitos.",
    tags: ["Thriller"], ref: "Advertencia CIC 2354"
  },
  {
    t: "Fourth Wing", a: "Rebecca Yarros", y: "2023", s: 2, cat: "Fantasía", l: "es",
    an: "Fantasía romántica con violencia y erotización de las relaciones.",
    tags: ["Fantasía", "Romance"], ref: "Advertencia CIC 2354"
  },
  {
    t: "Iron Flame", a: "Rebecca Yarros", y: "2023", s: 2, cat: "Fantasía", l: "es",
    an: "Continuación con relaciones intensas y presencia de magia.",
    tags: ["Fantasía"], ref: "Advertencia CIC 2117"
  },
  {
    t: "A Court of Thorns and Roses", a: "Sarah J. Maas", y: "2015", s: 2, cat: "Fantasía", l: "es",
    an: "Fantasía romántica con contenido sexual explícito y relaciones complejas.",
    tags: ["Romantasy"], ref: "Advertencia CIC 2354"
  },
  {
    t: "A Court of Mist and Fury", a: "Sarah J. Maas", y: "2016", s: 2, cat: "Fantasía", l: "es",
    an: "Relaciones emocionalmente intensas con erotización significativa.",
    tags: ["Romantasy"], ref: "Advertencia CIC 2354"
  },
  {
    t: "Twisted Love", a: "Ana Huang", y: "2021", s: 1, cat: "Romance", l: "es",
    an: "Relaciones obsesivas con fuerte carga sexual.",
    tags: ["Romance"], ref: "Advertencia CIC 2354"
  },
  {
    t: "Twisted Games", a: "Ana Huang", y: "2021", s: 1, cat: "Romance", l: "es",
    an: "Romance centrado en deseo y poder con erotización.",
    tags: ["Romance"], ref: "Advertencia CIC 2354"
  },
  {
    t: "Haunting Adeline", a: "H.D. Carlton", y: "2021", s: 1, cat: "Romance oscuro", l: "es",
    an: "Contenido extremadamente explícito y perturbador en relaciones.",
    tags: ["Dark romance"], ref: "Contrario a CIC 2354"
  },
  {
    t: "The Love Hypothesis", a: "Ali Hazelwood", y: "2021", s: 3, cat: "Romance", l: "es",
    an: "Romance contemporáneo con elementos emocionales y cierta carga sexual.",
    tags: ["Romance"], ref: "Discernimiento"
  },
  {
    t: "Book Lovers", a: "Emily Henry", y: "2022", s: 3, cat: "Romance", l: "es",
    an: "Relación romántica moderna sin referencias espirituales.",
    tags: ["Romance"], ref: "Neutral"
  },
  {
    t: "Happy Place", a: "Emily Henry", y: "2023", s: 3, cat: "Romance", l: "es",
    an: "Explora relaciones humanas complejas con enfoque emocional.",
    tags: ["Romance"], ref: "Discernimiento"
  },
  {
    t: "The Seven Husbands of Evelyn Hugo", a: "Taylor Jenkins Reid", y: "2017", s: 2, cat: "Drama", l: "es",
    an: "Relativismo moral en relaciones afectivas y decisiones personales.",
    tags: ["Drama"], ref: "Discernimiento"
  },
  {
    t: "Daisy Jones & The Six", a: "Taylor Jenkins Reid", y: "2019", s: 2, cat: "Drama", l: "es",
    an: "Ambiente de excesos y relativismo moral en el mundo artístico.",
    tags: ["Música"], ref: "Discernimiento"
  },
  {
    t: "The Midnight Library", a: "Matt Haig", y: "2020", s: 3, cat: "Ficción", l: "es",
    an: "Explora el sentido de la vida sin referencia a Dios ni trascendencia.",
    tags: ["Filosofía"], ref: "Discernimiento CIC 1700"
  },
  {
    t: "The Invisible Life of Addie LaRue", a: "V.E. Schwab", y: "2020", s: 2, cat: "Fantasía", l: "es",
    an: "Narrativa basada en un pacto sobrenatural con implicaciones problemáticas.",
    tags: ["Fantasía"], ref: "Advertencia CIC 2117"
  },
  {
    t: "The Housemaid", a: "Freida McFadden", y: "2022", s: 2, cat: "Thriller", l: "es",
    an: "Thriller psicológico con tensión moral y ambigüedad.",
    tags: ["Thriller"], ref: "Discernimiento"
  },
  {
    t: "The Perfect Marriage", a: "Jeneva Rose", y: "2020", s: 2, cat: "Thriller", l: "es",
    an: "Infidelidad y crimen como eje narrativo.",
    tags: ["Thriller"], ref: "Discernimiento CIC 2380"
  },
  {
    t: "Things We Never Got Over", a: "Lucy Score", y: "2022", s: 2, cat: "Romance", l: "es",
    an: "Romance adulto con presencia de sexualidad explícita.",
    tags: ["Romance"], ref: "Advertencia CIC 2354"
  },
  {
    t: "Reminders of Him", a: "Colleen Hoover", y: "2022", s: 3, cat: "Drama", l: "es",
    an: "Historia de redención con elementos positivos aunque complejos.",
    tags: ["Redención"], ref: "Parcialmente compatible"
  },
  {
    t: "Better Than the Movies", a: "Lynn Painter", y: "2021", s: 4, cat: "Juvenil", l: "es",
    an: "Romance juvenil ligero con valores generalmente positivos.",
    tags: ["Juvenil"], ref: "Compatible"
  },
  {
    t: "The Song of Achilles", a: "Madeline Miller", y: "2011", s: 2, cat: "Ficción", l: "es",
    an: "Reinterpretación mitológica con enfoque en relaciones afectivas.",
    tags: ["Mitología"], ref: "Discernimiento"
  },
  {
    t: "Icebreaker", a: "Hannah Grace", y: "2022", s: 1, cat: "Romance", l: "es",
    an: "Relaciones altamente sexualizadas en contexto juvenil.",
    tags: ["Romance"], ref: "Advertencia CIC 2354"
  },
  {
    t: "Wildfire", a: "Hannah Grace", y: "2024", s: 1, cat: "Romance", l: "es",
    an: "Romance contemporáneo con fuerte carga sexual y emocional.",
    tags: ["Romance"], ref: "Advertencia CIC 2354"
  },
  {
    t: "Daydream", a: "Hannah Grace", y: "2024", s: 2, cat: "Romance", l: "es",
    an: "Relaciones juveniles con enfoque emocional y cierta erotización.",
    tags: ["Romance"], ref: "Discernimiento"
  },
  {
    t: "Powerless", a: "Lauren Roberts", y: "2023", s: 2, cat: "Fantasía", l: "es",
    an: "Fantasía juvenil con romance y violencia moderada.",
    tags: ["Fantasía"], ref: "Discernimiento"
  },
  {
    t: "Reckless", a: "Lauren Roberts", y: "2024", s: 2, cat: "Fantasía", l: "es",
    an: "Continuación con romance intenso y conflictos morales.",
    tags: ["Fantasía"], ref: "Discernimiento"
  },
  {
    t: "Fearless", a: "Lauren Roberts", y: "2025", s: 2, cat: "Fantasía", l: "es",
    an: "Saga con énfasis en emociones y relaciones complejas.",
    tags: ["Fantasía"], ref: "Discernimiento"
  },
  {
    t: "Divine Rivals", a: "Rebecca Ross", y: "2023", s: 4, cat: "Fantasía", l: "es",
    an: "Historia con valores de sacrificio y amor en contexto fantástico.",
    tags: ["Fantasía"], ref: "Compatible"
  },
  {
    t: "Ruthless Vows", a: "Rebecca Ross", y: "2024", s: 4, cat: "Fantasía", l: "es",
    an: "Continuación con enfoque en compromiso y amor fiel.",
    tags: ["Fantasía"], ref: "Compatible"
  },
  {
    t: "Bride", a: "Ali Hazelwood", y: "2024", s: 2, cat: "Romance", l: "es",
    an: "Romance paranormal con elementos sexuales y fantásticos.",
    tags: ["Romance"], ref: "Advertencia CIC 2354"
  },
  {
    t: "Check & Mate", a: "Ali Hazelwood", y: "2023", s: 3, cat: "Romance", l: "es",
    an: "Romance juvenil con enfoque emocional y desarrollo personal.",
    tags: ["Romance"], ref: "Discernimiento"
  },
  {
    t: "Love, Theoretically", a: "Ali Hazelwood", y: "2023", s: 3, cat: "Romance", l: "es",
    an: "Relación romántica moderna con cierta carga sexual.",
    tags: ["Romance"], ref: "Discernimiento"
  },
  {
    t: "Funny Story", a: "Emily Henry", y: "2024", s: 3, cat: "Romance", l: "es",
    an: "Relación contemporánea con conflictos emocionales.",
    tags: ["Romance"], ref: "Discernimiento"
  },
  {
    t: "Just for the Summer", a: "Abby Jimenez", y: "2024", s: 3, cat: "Romance", l: "es",
    an: "Historia romántica con elementos emocionales complejos.",
    tags: ["Romance"], ref: "Discernimiento"
  },
  {
    t: "Yours Truly", a: "Abby Jimenez", y: "2023", s: 4, cat: "Romance", l: "es",
    an: "Relación basada en cuidado y empatía.",
    tags: ["Romance"], ref: "Parcialmente compatible"
  },
  {
    t: "The Paradise Problem", a: "Christina Lauren", y: "2024", s: 2, cat: "Romance", l: "es",
    an: "Romance adulto con situaciones moralmente ambiguas.",
    tags: ["Romance"], ref: "Discernimiento"
  },
  {
    t: "Love Redesigned", a: "Lauren Asher", y: "2023", s: 2, cat: "Romance", l: "es",
    an: "Relación romántica con carga emocional y sexual.",
    tags: ["Romance"], ref: "Advertencia CIC 2354"
  },
  {
    t: "Final Offer", a: "Lauren Asher", y: "2023", s: 2, cat: "Romance", l: "es",
    an: "Relaciones complejas con enfoque en deseo y conflictos.",
    tags: ["Romance"], ref: "Discernimiento"
  },
  {
    t: "King of Pride", a: "Ana Huang", y: "2023", s: 1, cat: "Romance", l: "es",
    an: "Romance altamente erotizado y centrado en deseo.",
    tags: ["Romance"], ref: "Advertencia CIC 2354"
  },
  {
    t: "King of Greed", a: "Ana Huang", y: "2024", s: 1, cat: "Romance", l: "es",
    an: "Relación marcada por ambición, deseo y materialismo.",
    tags: ["Romance"], ref: "Advertencia CIC 2424"
  },
  {
    t: "King of Sloth", a: "Ana Huang", y: "2024", s: 1, cat: "Romance", l: "es",
    an: "Romance con enfoque en placer y estilo de vida superficial.",
    tags: ["Romance"], ref: "Discernimiento"
  },
  {
    t: "Flawless", a: "Elsie Silver", y: "2023", s: 2, cat: "Romance", l: "es",
    an: "Romance adulto con contenido sexual explícito.",
    tags: ["Romance"], ref: "Advertencia CIC 2354"
  },
  {
    t: "Heartless", a: "Elsie Silver", y: "2023", s: 2, cat: "Romance", l: "es",
    an: "Relaciones intensas con erotización.",
    tags: ["Romance"], ref: "Advertencia CIC 2354"
  },
  {
    t: "Hopeless", a: "Elsie Silver", y: "2024", s: 2, cat: "Romance", l: "es",
    an: "Romance emocional con elementos desordenados.",
    tags: ["Romance"], ref: "Discernimiento"
  },
  {
    t: "Magnolia Parks", a: "Jessa Hastings", y: "2023", s: 1, cat: "Romance", l: "es",
    an: "Relaciones tóxicas y superficialidad emocional.",
    tags: ["Romance"], ref: "Advertencia CIC 2354"
  },
  {
    t: "Daisy Haites", a: "Jessa Hastings", y: "2023", s: 1, cat: "Romance", l: "es",
    an: "Ambiente de excesos, relaciones desordenadas.",
    tags: ["Romance"], ref: "Discernimiento"
  },
  {
    t: "Binding 13", a: "Chloe Walsh", y: "2023", s: 2, cat: "Juvenil", l: "es",
    an: "Historia juvenil con romance intenso y conflictos.",
    tags: ["Juvenil"], ref: "Discernimiento"
  },
  {
    t: "Keeping 13", a: "Chloe Walsh", y: "2023", s: 2, cat: "Juvenil", l: "es",
    an: "Continuación con enfoque en relaciones complejas.",
    tags: ["Juvenil"], ref: "Discernimiento"
  },
  {
    t: "Saving 6", a: "Chloe Walsh", y: "2024", s: 2, cat: "Juvenil", l: "es",
    an: "Temas de trauma y redención parcial.",
    tags: ["Juvenil"], ref: "Discernimiento"
  },
  {
    t: "Redeeming 6", a: "Chloe Walsh", y: "2024", s: 2, cat: "Juvenil", l: "es",
    an: "Proceso de cambio personal con elementos positivos.",
    tags: ["Juvenil"], ref: "Parcialmente compatible"
  },
  {
    t: "El Señor de los Anillos", a: "J.R.R. Tolkien", y: "1954", s: 5, cat: "Fantasía", l: "es",
    an: "Obra profundamente inspirada en valores cristianos como el sacrificio, la humildad y el bien.",
    tags: ["Fantasía", "Virtud"], ref: "Compatible"
  },
  {
    t: "El Hobbit", a: "J.R.R. Tolkien", y: "1937", s: 5, cat: "Fantasía", l: "es",
    an: "Aventura con valores de valentía, amistad y crecimiento personal.",
    tags: ["Fantasía"], ref: "Compatible"
  },
  {
    t: "Las Crónicas de Narnia", a: "C.S. Lewis", y: "1950", s: 5, cat: "Fantasía", l: "es",
    an: "Alegoría cristiana accesible que transmite valores evangélicos.",
    tags: ["Fantasía", "Cristianismo"], ref: "Compatible"
  },
  {
    t: "Mero cristianismo", a: "C.S. Lewis", y: "1952", s: 5, cat: "Teología", l: "es",
    an: "Defensa clara y racional de la fe cristiana.",
    tags: ["Apologética"], ref: "Compatible CIC 31"
  },
  {
    t: "Cartas del diablo a su sobrino", a: "C.S. Lewis", y: "1942", s: 5, cat: "Espiritualidad", l: "es",
    an: "Reflexión brillante sobre la tentación y la vida moral.",
    tags: ["Espiritualidad"], ref: "Compatible"
  },
  {
    t: "Orgullo y prejuicio", a: "Jane Austen", y: "1813", s: 5, cat: "Clásico", l: "es",
    an: "Historia sobre virtud, carácter y amor auténtico.",
    tags: ["Virtud"], ref: "Compatible"
  },
  {
    t: "Jane Eyre", a: "Charlotte Brontë", y: "1847", s: 5, cat: "Clásico", l: "es",
    an: "Fuerte sentido moral, dignidad y fe personal.",
    tags: ["Virtud"], ref: "Compatible"
  },
  {
    t: "Crimen y castigo", a: "Fiódor Dostoyevski", y: "1866", s: 5, cat: "Clásico", l: "es",
    an: "Exploración del pecado, culpa y redención profundamente cristiana.",
    tags: ["Redención"], ref: "Compatible CIC 1847"
  },
  {
    t: "Los hermanos Karamazov", a: "Fiódor Dostoyevski", y: "1880", s: 5, cat: "Clásico", l: "es",
    an: "Reflexión profunda sobre Dios, libertad y moral.",
    tags: ["Teología"], ref: "Compatible"
  },
  {
    t: "Anna Karenina", a: "León Tolstói", y: "1877", s: 4, cat: "Clásico", l: "es",
    an: "Muestra consecuencias del pecado y búsqueda de sentido.",
    tags: ["Moral"], ref: "Compatible"
  },
  {
    t: "Guerra y paz", a: "León Tolstói", y: "1869", s: 5, cat: "Clásico", l: "es",
    an: "Gran obra sobre historia, providencia y sentido de la vida.",
    tags: ["Historia"], ref: "Compatible"
  },
  {
    t: "El conde de Montecristo", a: "Alexandre Dumas", y: "1844", s: 5, cat: "Clásico", l: "es",
    an: "Historia sobre justicia, perdón y redención.",
    tags: ["Redención"], ref: "Compatible"
  },
  {
    t: "Los miserables", a: "Victor Hugo", y: "1862", s: 5, cat: "Clásico", l: "es",
    an: "Profunda reflexión sobre gracia, misericordia y conversión.",
    tags: ["Misericordia"], ref: "Compatible"
  },
  {
    t: "Don Quijote de la Mancha", a: "Miguel de Cervantes", y: "1605", s: 5, cat: "Clásico", l: "es",
    an: "Obra rica en valores humanos, idealismo y dignidad.",
    tags: ["Clásico"], ref: "Compatible"
  },
  {
    t: "El principito", a: "Antoine de Saint-Exupéry", y: "1943", s: 5, cat: "Fábula", l: "es",
    an: "Reflexión sobre amor, responsabilidad y sentido de la vida.",
    tags: ["Valores"], ref: "Compatible"
  },
  {
    t: "La cabaña", a: "William P. Young", y: "2007", s: 4, cat: "Ficción espiritual", l: "es",
    an: "Reflexiona sobre el sufrimiento y Dios, aunque con simplificaciones teológicas.",
    tags: ["Espiritualidad"], ref: "Discernimiento"
  },
  {
    t: "El poder del ahora", a: "Eckhart Tolle", y: "1997", s: 2, cat: "Espiritualidad", l: "es",
    an: "Espiritualidad con elementos no cristianos. Requiere discernimiento.",
    tags: ["New Age"], ref: "Advertencia CIC 2117"
  },
  {
    t: "Hábitos atómicos", a: "James Clear", y: "2018", s: 5, cat: "Autoayuda", l: "es",
    an: "Promueve disciplina y crecimiento personal alineado con la virtud.",
    tags: ["Virtud"], ref: "Compatible CIC 1803"
  },
  {
    t: "Los 7 hábitos de la gente altamente efectiva", a: "Stephen R. Covey", y: "1989", s: 5, cat: "Autoayuda", l: "es",
    an: "Enfoque ético del desarrollo personal y responsabilidad.",
    tags: ["Virtud"], ref: "Compatible"
  },
  {
    t: "El hombre en busca de sentido", a: "Viktor Frankl", y: "1946", s: 5, cat: "Testimonio", l: "es",
    an: "Reflexión sobre sufrimiento y sentido con fuerte compatibilidad cristiana.",
    tags: ["Sufrimiento"], ref: "Compatible"
  },
  {
    t: "Introducción al cristianismo", a: "Joseph Ratzinger", y: "1968", s: 5, cat: "Teología", l: "es",
    an: "Explicación profunda de la fe cristiana.",
    tags: ["Teología"], ref: "Compatible"
  },
  {
    t: "Jesús de Nazaret", a: "Joseph Ratzinger", y: "2007", s: 5, cat: "Teología", l: "es",
    an: "Presentación rigurosa de la figura de Cristo.",
    tags: ["Cristología"], ref: "Compatible"
  },
  {
    t: "Confesiones", a: "San Agustín", y: "397", s: 5, cat: "Espiritualidad", l: "es",
    an: "Clásico de conversión y búsqueda de Dios.",
    tags: ["Conversión"], ref: "Tradición"
  },
  {
    t: "Imitación de Cristo", a: "Tomás de Kempis", y: "1418", s: 5, cat: "Espiritualidad", l: "es",
    an: "Guía espiritual centrada en la vida interior.",
    tags: ["Espiritualidad"], ref: "Tradición"
  },
  {
    t: "Historia de un alma", a: "Santa Teresa de Lisieux", y: "1898", s: 5, cat: "Espiritualidad", l: "es",
    an: "Camino de santidad basado en lo pequeño y cotidiano.",
    tags: ["Santidad"], ref: "Tradición"
  },
  {
    t: "Camino", a: "San Josemaría Escrivá", y: "1939", s: 5, cat: "Espiritualidad", l: "es",
    an: "Reflexiones breves sobre vida cristiana y santidad.",
    tags: ["Virtud"], ref: "Compatible"
  },
  {
    t: "El gran divorcio", a: "C.S. Lewis", y: "1945", s: 5, cat: "Ficción teológica", l: "es",
    an: "Reflexión sobre cielo, infierno y libertad humana.",
    tags: ["Teología"], ref: "Compatible"
  },
  {
    t: "La abolición del hombre", a: "C.S. Lewis", y: "1943", s: 5, cat: "Filosofía", l: "es",
    an: "Defensa de la moral objetiva frente al relativismo.",
    tags: ["Moral"], ref: "Compatible"
  },
  {
    t: "El Señor de los Anillos", a: "J.R.R. Tolkien", y: "1954", s: 5, cat: "Fantasía", l: "es",
    an: "Obra profundamente inspirada en valores cristianos como sacrificio y humildad.",
    tags: ["Virtud"], ref: "Compatible"
  },
  {
    t: "El Hobbit", a: "J.R.R. Tolkien", y: "1937", s: 5, cat: "Fantasía", l: "es",
    an: "Aventura con valores de crecimiento personal y valentía.",
    tags: ["Virtud"], ref: "Compatible"
  },
  {
    t: "Crimen y castigo", a: "Fiódor Dostoyevski", y: "1866", s: 5, cat: "Clásico", l: "es",
    an: "Exploración del pecado, culpa y redención.",
    tags: ["Redención"], ref: "Compatible CIC 1847"
  },
  {
    t: "Los miserables", a: "Victor Hugo", y: "1862", s: 5, cat: "Clásico", l: "es",
    an: "Historia sobre misericordia, justicia y conversión.",
    tags: ["Misericordia"], ref: "Compatible"
  },
  {
    t: "1984", a: "George Orwell", y: "1949", s: 4, cat: "Distopía", l: "es",
    an: "Defensa de la verdad frente al totalitarismo.",
    tags: ["Verdad"], ref: "Compatible"
  },
  {
    t: "Un mundo feliz", a: "Aldous Huxley", y: "1932", s: 2, cat: "Distopía", l: "es",
    an: "Visión sin Dios ni familia. Útil como advertencia.",
    tags: ["Distopía"], ref: "Discernimiento"
  },
  {
    t: "Hábitos atómicos", a: "James Clear", y: "2018", s: 5, cat: "Autoayuda", l: "es",
    an: "Promueve disciplina y virtud.",
    tags: ["Virtud"], ref: "Compatible CIC 1803"
  },
  {
    t: "El hombre en busca de sentido", a: "Viktor Frankl", y: "1946", s: 5, cat: "Testimonio", l: "es",
    an: "Reflexión sobre sufrimiento y sentido.",
    tags: ["Sufrimiento"], ref: "Compatible"
  },
  {
    t: "It Ends With Us", a: "Colleen Hoover", y: "2016", s: 2, cat: "Romance", l: "es",
    an: "Relación marcada por abuso emocional.",
    tags: ["Romance"], ref: "Discernimiento CIC 2337"
  },
  {
    t: "Verity", a: "Colleen Hoover", y: "2018", s: 1, cat: "Thriller", l: "es",
    an: "Contenido oscuro con sexualidad explícita.",
    tags: ["Thriller"], ref: "Advertencia CIC 2354"
  },
  {
    t: "Fourth Wing", a: "Rebecca Yarros", y: "2023", s: 2, cat: "Fantasía", l: "es",
    an: "Fantasía romántica con erotización.",
    tags: ["Romantasy"], ref: "Advertencia CIC 2354"
  },
  {
    t: "The Housemaid", a: "Freida McFadden", y: "2022", s: 2, cat: "Thriller", l: "es",
    an: "Thriller psicológico con ambigüedad moral.",
    tags: ["Thriller"], ref: "Discernimiento"
  },
  {
    t: "La biblioteca de la medianoche", a: "Matt Haig", y: "2020", s: 3, cat: "Ficción", l: "es",
    an: "Explora el sentido de la vida sin referencia a Dios.",
    tags: ["Filosofía"], ref: "Discernimiento"
  },
  {
    t: "El alquimista", a: "Paulo Coelho", y: "1988", s: 2, cat: "Espiritualidad", l: "es",
    an: "Espiritualidad difusa con elementos New Age.",
    tags: ["New Age"], ref: "Advertencia CIC 2117"
  },
  {
    t: "Mero cristianismo", a: "C.S. Lewis", y: "1952", s: 5, cat: "Teología", l: "es",
    an: "Defensa racional de la fe cristiana.",
    tags: ["Apologética"], ref: "Compatible"
  },
  {
    t: "Confesiones", a: "San Agustín", y: "397", s: 5, cat: "Espiritualidad", l: "es",
    an: "Relato de conversión y búsqueda de Dios.",
    tags: ["Conversión"], ref: "Tradición"
  },
  {
    t: "Don Quijote de la Mancha", a: "Miguel de Cervantes", y: "1605", s: 5, cat: "Clásico", l: "es",
    an: "Obra fundamental sobre idealismo, dignidad y sentido de la vida.",
    tags: ["Clásico"], ref: "Compatible"
  },
  {
    t: "La Celestina", a: "Fernando de Rojas", y: "1499", s: 2, cat: "Clásico", l: "es",
    an: "Refleja pasiones desordenadas y consecuencias del pecado.",
    tags: ["Moral"], ref: "Discernimiento"
  },
  {
    t: "Lazarillo de Tormes", a: "Anónimo", y: "1554", s: 3, cat: "Clásico", l: "es",
    an: "Crítica social con ambigüedad moral.",
    tags: ["Sociedad"], ref: "Discernimiento"
  },
  {
    t: "Fuenteovejuna", a: "Lope de Vega", y: "1619", s: 4, cat: "Clásico", l: "es",
    an: "Reflexión sobre justicia y comunidad.",
    tags: ["Justicia"], ref: "Compatible"
  },
  {
    t: "Hamlet", a: "William Shakespeare", y: "1603", s: 4, cat: "Clásico", l: "es",
    an: "Explora la duda moral, la venganza y la conciencia.",
    tags: ["Moral"], ref: "Discernimiento"
  },
  {
    t: "Macbeth", a: "William Shakespeare", y: "1606", s: 3, cat: "Clásico", l: "es",
    an: "Ambición desordenada y consecuencias del mal.",
    tags: ["Pecado"], ref: "Discernimiento"
  },
  {
    t: "Romeo y Julieta", a: "William Shakespeare", y: "1597", s: 3, cat: "Clásico", l: "es",
    an: "Amor apasionado sin prudencia con consecuencias trágicas.",
    tags: ["Amor"], ref: "Discernimiento"
  },
  {
    t: "La divina comedia", a: "Dante Alighieri", y: "1320", s: 5, cat: "Clásico", l: "es",
    an: "Visión profundamente cristiana del cielo, purgatorio e infierno.",
    tags: ["Teología"], ref: "Compatible"
  },
  {
    t: "Fausto", a: "Johann Wolfgang von Goethe", y: "1808", s: 2, cat: "Clásico", l: "es",
    an: "Pacto con el diablo y búsqueda desordenada del conocimiento.",
    tags: ["Tentación"], ref: "Advertencia CIC 2117"
  },
  {
    t: "Los miserables", a: "Victor Hugo", y: "1862", s: 5, cat: "Clásico", l: "es",
    an: "Historia sobre gracia, misericordia y redención.",
    tags: ["Misericordia"], ref: "Compatible"
  },
  {
    t: "El conde de Montecristo", a: "Alexandre Dumas", y: "1844", s: 5, cat: "Clásico", l: "es",
    an: "Justicia, venganza y perdón.",
    tags: ["Redención"], ref: "Compatible"
  },
  {
    t: "Madame Bovary", a: "Gustave Flaubert", y: "1857", s: 2, cat: "Clásico", l: "es",
    an: "Consecuencias del adulterio y la insatisfacción.",
    tags: ["Moral"], ref: "Discernimiento CIC 2380"
  },
  {
    t: "Crimen y castigo", a: "Fiódor Dostoyevski", y: "1866", s: 5, cat: "Clásico", l: "es",
    an: "Exploración del pecado, culpa y redención.",
    tags: ["Redención"], ref: "Compatible CIC 1847"
  },
  {
    t: "Los hermanos Karamazov", a: "Fiódor Dostoyevski", y: "1880", s: 5, cat: "Clásico", l: "es",
    an: "Reflexión profunda sobre Dios, libertad y moral.",
    tags: ["Teología"], ref: "Compatible"
  },
  {
    t: "El idiota", a: "Fiódor Dostoyevski", y: "1869", s: 5, cat: "Clásico", l: "es",
    an: "Retrato de la bondad en un mundo corrupto.",
    tags: ["Virtud"], ref: "Compatible"
  },
  {
    t: "Anna Karenina", a: "León Tolstói", y: "1877", s: 3, cat: "Clásico", l: "es",
    an: "Relaciones desordenadas y consecuencias morales.",
    tags: ["Moral"], ref: "Discernimiento"
  },
  {
    t: "Guerra y paz", a: "León Tolstói", y: "1869", s: 5, cat: "Clásico", l: "es",
    an: "Reflexión sobre historia, providencia y sentido de la vida.",
    tags: ["Historia"], ref: "Compatible"
  },
  {
    t: "Drácula", a: "Bram Stoker", y: "1897", s: 3, cat: "Clásico", l: "es",
    an: "Lucha simbólica entre el bien y el mal.",
    tags: ["Bien y mal"], ref: "Discernimiento"
  },
  {
    t: "Frankenstein", a: "Mary Shelley", y: "1818", s: 3, cat: "Clásico", l: "es",
    an: "Reflexión sobre los límites de la ciencia.",
    tags: ["Ciencia"], ref: "Discernimiento"
  },
  {
    t: "Moby Dick", a: "Herman Melville", y: "1851", s: 4, cat: "Clásico", l: "es",
    an: "Obsesión humana frente a lo trascendente.",
    tags: ["Existencial"], ref: "Discernimiento"
  },
  {
    t: "Orgullo y prejuicio", a: "Jane Austen", y: "1813", s: 5, cat: "Clásico", l: "es",
    an: "Virtud, carácter y amor auténtico.",
    tags: ["Virtud"], ref: "Compatible"
  },
  {
    t: "Sentido y sensibilidad", a: "Jane Austen", y: "1811", s: 5, cat: "Clásico", l: "es",
    an: "Equilibrio entre razón y emoción.",
    tags: ["Virtud"], ref: "Compatible"
  },
  {
    t: "Jane Eyre", a: "Charlotte Brontë", y: "1847", s: 5, cat: "Clásico", l: "es",
    an: "Dignidad, fe y moral personal.",
    tags: ["Virtud"], ref: "Compatible"
  },
  {
    t: "Cumbres borrascosas", a: "Emily Brontë", y: "1847", s: 2, cat: "Clásico", l: "es",
    an: "Pasiones intensas y destructivas.",
    tags: ["Pasión"], ref: "Discernimiento"
  },
  {
    t: "El retrato de Dorian Gray", a: "Oscar Wilde", y: "1890", s: 2, cat: "Clásico", l: "es",
    an: "Hedonismo y corrupción moral.",
    tags: ["Pecado"], ref: "Discernimiento"
  }
];
