let stories = [
    "*قصة النبي نوح عليه السلام:* كان النبي نوح عليه السلام يدعو قومه لعبادة الله وحده، لكنهم كذبوه. فأمره الله أن يبني سفينة، وحين حل الطوفان، نجا المؤمنون وغرق الكافرون. هذه القصة تعلمنا الصبر والإصرار في الدعوة إلى الله.",
    "*قصة النبي موسى عليه السلام وفرعون:* عاش النبي موسى في زمن فرعون الذي كان يظلم الناس. كان موسى يدعو فرعون إلى عبادة الله، لكن فرعون جحد دعوته. ثم أرسل الله عليه آيات عظيمة حتى غرق فرعون في البحر. القصة تعلمنا أن الله قادر على إظهار الحق مهما كانت القوة الظالمة.",
    "*قصة النبي عيسى عليه السلام:* كان النبي عيسى عليه السلام يحاول أن يقنع قومه بالحق، وظهر معه العديد من المعجزات. لكنهم كذبوه وحاولوا قتله، فرفعه الله إلى السماء. القصة تعلمنا أن المعجزات لا تجعل الناس يؤمنون دائمًا، بل القلب هو من يفتح أبواب الإيمان.",
    "*قصة الصحابي سلمان الفارسي:* كان سلمان الفارسي يبحث عن الحقيقة طوال حياته، حتى وجدها في الإسلام. وقد قال عنه النبي ﷺ: 'سلمان منا أهل البيت'. القصة تعلمنا أن البحث عن الحقيقة قد يؤدي إلى النور رغم بعد المسافات.",
    "*قصة النبي محمد ﷺ مع الأعرابي الذي بذر الماء:* في أحد الأيام، مر النبي ﷺ بأعرابي كان يروي زرعه بالماء. فقال له النبي ﷺ: 'لو أن الله هو الذي يرزقك، فكيف بذرت الماء؟' ثم علمه النبي ﷺ أن التوكل على الله لا يمنع السعي وراء الرزق. القصة تعلمنا التوكل والعمل معًا.",
    "*قصة الصحابي عمرو بن العاص:* كان عمرو بن العاص أحد القادة العسكريين البارعين، وكان من أعداء الإسلام في البداية. لكنه أسلم في نهاية المطاف وشارك في غزوات المسلمين. القصة تعلمنا أن الإسلام يفتح قلوب الناس مهما كان موقفهم السابق.",
    "*قصة الصحابي خالد بن الوليد:* خالد بن الوليد كان أحد أعظم القادة العسكريين في التاريخ. حارب في العديد من الغزوات حتى لُقب 'سيف الله المسلول'. القصة تعلمنا الشجاعة والإخلاص في الدفاع عن الحق.",
    "*قصة الصحابي أبي هريرة:* كان أبي هريرة من أكثر الصحابة الذين نقلوا أحاديث النبي ﷺ. وكان يروي الحديث بكل دقة واهتمام. القصة تعلمنا أهمية العلم والتعلم ونقل المعرفة.",
    "*قصة الصحابي عثمان بن عفان:* كان عثمان بن عفان من الأغنياء الذين أنفقوا أموالهم في سبيل الله. وقد اشترى بئر رومة وأوقفه للمسلمين. القصة تعلمنا أهمية المال حين يُنفق في سبيل الله.",
    "*قصة السيدة فاطمة الزهراء:* السيدة فاطمة كانت رمزًا للصدق والطهارة. كانت تتحمل الكثير من الألم والمعاناة من أجل خدمة الدين وأبيها ﷺ. القصة تعلمنا القوة والصبر في مواجهة الصعاب.",
    "*قصة الصحابي عبد الله بن مسعود:* كان عبد الله بن مسعود من أفضل الصحابة في العلم، وقد كان له الفضل في نقل الكثير من أحاديث النبي ﷺ. وقد كان يقرأ القرآن بصوت جميل ومؤثر. القصة تعلمنا أهمية تدبر القرآن والعمل به.",
    "*قصة الصحابي بلال بن رباح:* بلال بن رباح كان من العبيد الذين عذبوا في مكة بسبب إيمانه، لكنه ثبت على إيمانه. كان يقول 'أحدٌ أحد' في وجه التعذيب، وكان أول من أذن في الإسلام. القصة تعلمنا الثبات على الإيمان مهما كانت الظروف.",
    "*قصة السيدة عائشة رضي الله عنها:* كانت السيدة عائشة إحدى أمهات المؤمنين، وتعلمنا منها الحكمة والذكاء. وقد قالت: 'من أراد أن يسأل عن الحديث، فليسألني'. القصة تعلمنا قيمة العلم والرغبة في التعلم.",
    "*قصة الصحابي طارق بن زياد:* طارق بن زياد كان القائد العسكري الذي قاد المسلمين في فتح الأندلس. عندما وصل إلى الشاطئ، أمر بإحراق السفن حتى لا يفكر أحد في العودة. القصة تعلمنا الثقة في الله والجرأة في اتخاذ القرارات الهامة.",
    "*قصة الصحابي سعد بن أبي وقاص:* كان سعد بن أبي وقاص أحد القادة العسكريين البارعين، وقد كان من أوائل من أسلموا. وكان له دور كبير في معركة القادسية ضد الفرس. القصة تعلمنا القيادة والإخلاص في خدمة الدين.",
    "*قصة الصحابي علي بن أبي طالب:* علي بن أبي طالب كان من أوائل من أسلموا، وشارك في العديد من الغزوات الهامة. وقد أظهر شجاعة وبسالة لا مثيل لهما في معركة بدر وأحد. القصة تعلمنا الشجاعة والحكمة في اتخاذ القرارات.",
    "*قصة الصحابي الزبير بن العوام:* الزبير بن العوام كان من الصحابة المخلصين الذين شاركوا في معركة أحد. وكان واحدًا من العشرة المبشّرين بالجنة. القصة تعلمنا الصبر والإيمان في مواجهة المصاعب.",
    "*قصة الصحابي أبو بكر الصديق:* كان أبو بكر الصديق هو أول من آمن بالنبي ﷺ ورافقه في رحلة الهجرة إلى المدينة. وكان يساعد النبي ﷺ في كل أمر، حتى أصبح أول خليفة بعد وفاته. القصة تعلمنا الإيمان والصدق في المواقف الصعبة.",
    "*قصة الصحابي عمر بن الخطاب رضي الله عنه:* عمر بن الخطاب كان أحد أعظم القادة في الإسلام. قبل إسلامه، كان من أعداء الدين، ولكن بعد إسلامه أصبح من أكبر المدافعين عن الإسلام. القصة تعلمنا أن التغيير ممكن بفضل الله.",
    "*قصة غزوة بدر:* غزوة بدر كانت أول معركة كبرى بين المسلمين وقريش، وكانت فيها معجزة إلهية حيث انتصر المسلمون رغم قلة عددهم. هذه المعركة تعلمنا أهمية الإيمان بالله والثقة في نصره.",
    "*قصة غزوة أحد:* غزوة أحد كانت معركة كبيرة بين المسلمين والمشركين، وقد نزلت الهزيمة على المسلمين بسبب عدم الالتزام بتوجيهات النبي ﷺ. القصة تعلمنا أهمية الالتزام بالأوامر القيادية.",
    "*قصة غزوة خيبر:* غزوة خيبر كانت من الغزوات الهامة التي خاضها المسلمون بقيادة النبي ﷺ ضد اليهود في حصون خيبر. القصة تعلمنا الإصرار في الثبات على المبادئ.",
    
    // إضافات جديدة من قصصك:
    "*قصة النبي يوسف عليه السلام:* كان النبي يوسف عليه السلام محبوبًا من أبيه يعقوب، ولكن إخوته حسدوه فوقعوا فيه مكيدة وألقوه في البئر. ومع مرور الوقت، أصبح يوسف عزيزًا في مصر. القصة تعلمنا أن الله يرفع من يشاء ويعاقب من يشاء."
];

function handler(m) {
    let randomStory = stories[Math.floor(Math.random() * stories.length)];
    m.reply(randomStory);
}

handler.help = ['قصة', 'قصص'];
handler.tags = ['main', 'fun'];
handler.command = ['قصة', 'قصص', 'حكاية'];
handler.group = false;

export default handler;