words_with_contexts = [
    ("قرار (Qarār)", "Decision", "Often used in news when discussing government or organizational decisions. E.g., قرار الرئيس يؤثر على البلاد (The president's decision affects the country)."),
    ("مؤسسة (Muʾassasa)", "Institution", "Commonly used to refer to large organizations or bodies, especially in news. E.g., مؤسسة تعليمية (Educational institution)."),
    ("رعاية (Riʿāya)", "Care", "Used in contexts like healthcare or child care. E.g., رعاية صحية (Health care)."),
    ("تكنولوجيا (Teknulūjiyā)", "Technology", "Frequently mentioned in discussions about modern advancements. E.g., تكنولوجيا المعلومات (Information technology)."),
    ("فرصة (Furṣa)", "Opportunity", "Used in contexts related to job opportunities, chances in life, etc. E.g., فرصة عمل (Job opportunity)."),
    ("إستثمار (Istithmār)", "Investment", "Common in economic news. E.g., إستثمار أجنبي (Foreign investment)."),
    ("مبادرة (Mubādara)", "Initiative", "Refers to a new plan or strategy. E.g., مبادرة السلام (Peace initiative)."),
    ("ميزانية (Mīzāniyya)", "Budget", "Frequently mentioned in financial news. E.g., ميزانية الدولة (State budget)."),
    ("تضحية (Taḍḥiya)", "Sacrifice", "Often used in contexts of war, family, or personal decisions. E.g., تضحية الجنود (The soldiers' sacrifice)."),
    ("تأثير (Taʾthīr)", "Influence", "Used to discuss the impact of an event or person. E.g., تأثير الإعلام (The influence of media)."),
    ("مستوى (Mustawā)", "Level", "Discusses various levels such as education, development, etc. E.g., مستوى التعليم (Education level)."),
    ("بيئة (Bīʾa)", "Environment", "Common in discussions about nature and surroundings. E.g., حماية البيئة (Environmental protection)."),
    ("معلومة (Maʿlūma)", "Piece of information", "Used in both formal and informal contexts. E.g., هذه معلومة مهمة (This is important information)."),
    ("إدارة (Idāra)", "Management", "Relevant in business and organizational contexts. E.g., إدارة الأعمال (Business management)."),
    ("قيادة (Qiyāda)", "Leadership", "Discusses the role or quality of leadership. E.g., قيادة حكيمة (Wise leadership)."),
    ("سلوك (Sulūk)", "Behavior", "Commonly used in psychology or sociology. E.g., سلوك الإنسان (Human behavior)."),
    ("مصلحة (Maṣlaḥa)", "Interest", "Often used in contexts of benefit or advantage. E.g., مصلحة وطنية (National interest)."),
    ("تعاون (Taʿāwun)", "Cooperation", "Used in international relations or teamwork. E.g., تعاون دولي (International cooperation)."),
    ("حرية (Ḥurriyya)", "Freedom", "A key concept in political discussions. E.g., حرية التعبير (Freedom of expression)."),
    ("صداقة (Ṣadāqa)", "Friendship", "Used in both personal and international relations. E.g., صداقة طويلة (Long friendship)."),
    ("تنمية (Tanmiya)", "Development", "Frequently used in economic and social contexts. E.g., تنمية اقتصادية (Economic development)."),
    ("تحدي (Taḥaddī)", "Challenge", "Refers to obstacles or difficult situations. E.g., تحدي كبير (A big challenge)."),
    ("حل (Ḥall)", "Solution", "Used in problem-solving contexts. E.g., حل سياسي (Political solution)."),
    ("مساواة (Musāwāt)", "Equality", "Discussed in social justice contexts. E.g., مساواة بين الجنسين (Gender equality)."),
    ("مسؤولية (Masʾūliyya)", "Responsibility", "Used in legal, social, or personal contexts. E.g., مسؤولية كبيرة (Great responsibility)."),
    ("ثقة (Thiqa)", "Trust or Confidence", "Often used in personal and professional contexts. E.g., ثقة بالنفس (Self-confidence)."),
    ("إبتسامة (Ibtisāmah)", "Smile", "Common in everyday language. E.g., إبتسامة جميلة (Beautiful smile)."),
    ("إكتشاف (Iktishāf)", "Discovery", "Used in scientific or adventurous contexts. E.g., إكتشاف جديد (New discovery)."),
    ("إبداع (Ibtiḍāʿ)", "Creativity", "Common in discussions about art and innovation. E.g., إبداع فني (Artistic creativity)."),
    ("تأمل (Taʾammul)", "Reflection or Contemplation", "Used in philosophical or spiritual contexts. E.g., تأمل في الحياة (Contemplation of life)."),
    ("تحدي (Taḥaddī)", "Challenge", "Discusses obstacles in various contexts. E.g., تحدي البيئة (Environmental challenge)."),
    ("إبتكار (Ibtikār)", "Innovation", "Common in technology and business contexts. E.g., إبتكار جديد (New innovation)."),
    ("رؤية (Ruʾya)", "Vision", "Used in strategic planning or personal aspirations. E.g., رؤية مستقبلية (Future vision)."),
    ("ترجمة (Tarjama)", "Translation", "Common in language and communication contexts. E.g., ترجمة نص (Text translation)."),
    ("عقوبة (ʿUqūba)", "Punishment", "Relevant in legal and disciplinary contexts. E.g., عقوبة السجن (Prison sentence)."),
    ("مغامرة (Mughāmara)", "Adventure", "Used in travel or life experiences. E.g., مغامرة شيقة (Exciting adventure)."),
    ("ظاهرة (Ẓāhira)", "Phenomenon", "Common in scientific and social contexts. E.g., ظاهرة طبيعية (Natural phenomenon)."),
    ("إتصال (Ittiṣāl)", "Communication", "Used in media and personal interaction contexts. E.g., إتصال هاتفي (Phone communication)."),
    ("إصلاح (Iṣlāḥ)", "Reform", "Common in political and social contexts. E.g., إصلاح التعليم (Education reform)."),
    ("عدو (ʿAduw)", "Enemy", "Used in military or personal contexts. E.g., عدو مشترك (Common enemy)."),
    ("صناعة (Ṣināʿa)", "Industry", "Common in economic news. E.g., صناعة السيارات (Car industry)."),
    ("قيمة (Qīma)", "Value", "Discusses both material and moral value. E.g., قيمة السوق (Market value)."),
    ("مجتمع (Mujtamaʿ)", "Society", "Used in sociology and cultural contexts. E.g., مجتمع متقدم (Advanced society)."),
    ("إرادة (Irāda)", "Willpower", "Often used in personal development contexts. E.g., إرادة قوية (Strong willpower).")
    # Add more words here up to 600
]

# Save as a text file
file_path = r"C:\Users\Gebruiker\ufcwatchpartybackend\Arabic_Fusha_600_Words.txt"
with open(file_path, 'w', encoding='utf-8') as f:
    for word, meaning, context in words_with_contexts:
        f.write(f"{word}\nMeaning: {meaning}\nContext: {context}\n\n")

file_path
