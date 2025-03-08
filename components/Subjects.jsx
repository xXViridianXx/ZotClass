const data = [
    { key: 'AC ENG', value: 'Academic English' },
    { key: 'AFAM', value: 'African American Studies' },
    { key: 'ANATOMY', value: 'Anatomy and Neurobiology' },
    { key: 'ANESTH', value: 'Anesthesiology' },
    { key: 'ANTHRO', value: 'Anthropology' },
    { key: 'ARABIC', value: 'Arabic' },
    { key: 'ARMN', value: 'Armenian' },
    { key: 'ART', value: 'Art' },
    { key: 'ART HIS', value: 'Art History' },
    { key: 'ARTS', value: 'Arts' },
    { key: 'ARTSHUM', value: 'Arts and Humanities' },
    { key: 'ASIANAM', value: 'Asian American Studies' },
    { key: 'BANA', value: 'Business Analytics' },
    { key: 'BATS', value: 'Biomedical and Translational Science' },
    { key: 'BIO SCI', value: 'Biological Sciences' },
    { key: 'BIOCHEM', value: 'Biological Chemistry' },
    { key: 'BME', value: 'Biomedical Engineering' },
    { key: 'CAMPREC', value: 'Campus Recreation' },
    { key: 'CBE', value: 'Chemical and Biomolecular Engineering' },
    { key: 'CBEMS', value: 'Chemical Engr and Materials Science (until 2019 SS2)' },
    { key: 'CEM', value: 'Community and Environmental Medicine' },
    { key: 'CHC/LAT', value: 'Chicano Latino' },
    { key: 'CHEM', value: 'Chemistry' },
    { key: 'CHINESE', value: 'Chinese' },
    { key: 'CLASSIC', value: 'Classics' },
    { key: 'CLT&THY', value: 'Culture and Theory' },
    { key: 'COGS', value: 'Cognitive Sciences' },
    { key: 'COM LIT', value: 'Comparative Literature' },
    { key: 'COMPSCI', value: 'Computer Science' },
    { key: 'CRITISM', value: 'Criticism' },
    { key: 'CRM/LAW', value: 'Criminology, Law and Society' },
    { key: 'CSE', value: 'Computer Science and Engineering' },
    { key: 'DANCE', value: 'Dance' },
    { key: 'DATA', value: 'Data Science (started 2022 SS1)' },
    { key: 'DERM', value: 'Dermatology' },
    { key: 'DEV BIO', value: 'Developmental and Cell Biology' },
    { key: 'DRAMA', value: 'Drama' },
    { key: 'E ASIAN', value: 'East Asian Languages and Literatures (until 2019 SS2)' },
    { key: 'EARTHSS', value: 'Earth System Science' },
    { key: 'EAS', value: 'East Asian Studies (started 2019 Fall)' },
    { key: 'ECO EVO', value: 'Ecology and Evolutionary Biology' },
    { key: 'ECON', value: 'Economics' },
    { key: 'ECPS', value: 'Embedded and Cyber-Physical Systems' },
    { key: 'ED AFF', value: 'Educational Affairs (Sch of Med)' },
    { key: 'EDUC', value: 'Education' },
    { key: 'EECS', value: 'Electrical Engineering and Computer Science' },
    { key: 'EHS', value: 'Environmental Health Sciences' },
    { key: 'ENGLISH', value: 'English' },
    { key: 'ENGR', value: 'Engineering' },
    { key: 'ENGRCEE', value: 'Civil and Environmental Engineering' },
    { key: 'ENGRMAE', value: 'Mechanical and Aerospace Engineering' },
    { key: 'ENGRMSE', value: 'Materials Science and Engineering (until 2020 SS2)' },
    { key: 'EPIDEM', value: 'Epidemiology' },
    { key: 'ER MED', value: 'Emergency Medicine' },
    { key: 'EURO ST', value: 'European Studies' },
    { key: 'FAM MED', value: 'Family Medicine' },
    { key: 'FIN', value: 'Finance' },
    { key: 'FLM&MDA', value: 'Film and Media Studies' },
    { key: 'FRENCH', value: 'French' },
    { key: 'GDIM', value: 'Game Design and Interactive Media (started 2021 Fall)' },
    { key: 'GEN&SEX', value: 'Gender and Sexuality Studies' },
    { key: 'GERMAN', value: 'German' },
    { key: 'GLBL ME', value: 'Global Middle East Studies' },
    { key: 'GLBLCLT', value: 'Global Cultures' },
    { key: 'GREEK', value: 'Greek' },
    { key: 'HEBREW', value: 'Hebrew' },
    { key: 'HINDI', value: 'Hindi' },
    { key: 'HISTORY', value: 'History' },
    { key: 'HUMAN', value: 'Humanities' },
    { key: 'HUMARTS', value: 'Humanities and Arts' },
    { key: 'I&C SCI', value: 'Information and Computer Science' },
    { key: 'IN4MATX', value: 'Informatics' },
    { key: 'INNO', value: 'Innovation and Entrepreneurship (started 2019 Fall)' },
    { key: 'INT MED', value: 'Internal Medicine' },
    { key: 'INTL ST', value: 'International Studies' },
    { key: 'IRAN', value: 'Iranian (started 2020 Fall)' },
    { key: 'ITALIAN', value: 'Italian' },
    { key: 'JAPANSE', value: 'Japanese' },
    { key: 'KOREAN', value: 'Korean' },
    { key: 'LATIN', value: 'Latin' },
    { key: 'LAW', value: 'Law' },
    { key: 'LINGUIS', value: 'Linguistics (until 2019 SS2)' },
    { key: 'LIT JRN', value: 'Literary Journalism' },
    { key: 'LPS', value: 'Logic and Philosophy of Science' },
    { key: 'LSCI', value: 'Language Science (started 2019 Fall)' },
    { key: 'M&MG', value: 'Microbiology and Molecular Genetics' },
    { key: 'MATH', value: 'Mathematics' },
    { key: 'MED', value: 'Medicine' },
    { key: 'MED ED', value: 'Medical Education' },
    { key: 'MED HUM', value: 'Medical Humanities' },
    { key: 'MGMT', value: 'Management' },
    { key: 'MGMT EP', value: 'Executive MBA' },
    { key: 'MGMT FE', value: 'Fully Employed MBA' },
    { key: 'MGMT HC', value: 'Health Care MBA' },
    { key: 'MGMTMBA', value: 'Management MBA' },
    { key: 'MGMTPHD', value: 'Management PhD' },
    { key: 'MIC BIO', value: 'Microbiology' },
    { key: 'MOL BIO', value: 'Molecular Biology and Biochemistry' },
    { key: 'MPAC', value: 'Accounting' },
    { key: 'MSE', value: 'Materials Science and Engineering (started 2020 Fall)' },
    { key: 'MUSIC', value: 'Music' },
    { key: 'NET SYS', value: 'Networked Systems' },
    { key: 'NEURBIO', value: 'Neurobiology and Behavior' },
    { key: 'NEUROL', value: 'Neurology' },
    { key: 'NUR SCI', value: 'Nursing Science' },
    { key: 'OB/GYN', value: 'Obstetrics and Gynecology' },
    { key: 'OPHTHAL', value: 'Ophthalmology' },
    { key: 'PATH', value: 'Pathology and Laboratory Medicine' },
    { key: 'PED GEN', value: 'Pediatrics Genetics' },
    { key: 'PEDS', value: 'Pediatrics' },
    { key: 'PERSIAN', value: 'Persian' },
    { key: 'PHARM', value: 'Pharmacology (started 2020 Fall)' },
    { key: 'PHILOS', value: 'Philosophy' },
    { key: 'PHMD', value: 'Pharmacy (started 2021 Fall)' },
    { key: 'PHRMSCI', value: 'Pharmaceutical Sciences' },
    { key: 'PHY SCI', value: 'Physical Science' },
    { key: 'PHYSICS', value: 'Physics' },
    { key: 'PHYSIO', value: 'Physiology and Biophysics' },
    { key: 'PLASTIC', value: 'Plastic Surgery' },
    { key: 'PM&R', value: 'Physical Medicine and Rehabilitation' },
    { key: 'POL SCI', value: 'Political Science' },
    { key: 'PORTUG', value: 'Portuguese' },
    { key: 'PSCI', value: 'Psychological Science (started 2019 Fall)' },
    { key: 'PSY BEH', value: 'Psychology and Social Behavior (until 2019 SS2)' },
    { key: 'PSYCH', value: 'Psychology' },
    { key: 'PUB POL', value: 'Public Policy' },
    { key: 'PUBHLTH', value: 'Public Health' },
    { key: 'RADIO', value: 'Radiology' },
    { key: 'REL STD', value: 'Religious Studies' },
    { key: 'ROTC', value: 'Reserve Officers\' Training Corps' },
    { key: 'RUSSIAN', value: 'Russian' },
    { key: 'SOC SCI', value: 'Social Science' },
    { key: 'SOCECOL', value: 'Social Ecology' },
    { key: 'SOCIOL', value: 'Sociology' },
    { key: 'SPANISH', value: 'Spanish' },
    { key: 'SPPS', value: 'Social Policy and Public Service' },
    { key: 'STATS', value: 'Statistics' },
    { key: 'SURGERY', value: 'Surgery' },
    { key: 'SWE', value: 'Software Engineering (started 2019 Fall)' },
    { key: 'TAGALOG', value: 'Tagalog' },
    { key: 'TOX', value: 'Toxicology' },
    { key: 'UCDC', value: 'UC Washington DC' },
    { key: 'UNI AFF', value: 'University Affairs' },
    { key: 'UNI STU', value: 'University Studies' },
    { key: 'UPPP', value: 'Urban Planning and Public Policy' },
    { key: 'VIETMSE', value: 'Vietnamese' },
    { key: 'VIS STD', value: 'Visual Studies' },
    { key: 'WRITING', value: 'Writing' },
]


const getCurrentYear = () => {
    const today = new Date();
    return today.getFullYear();
}



const currentYear = getCurrentYear();
const nextYear = currentYear + 1;

const years = [
    { key: currentYear.toString(), value: currentYear.toString() },
    { key: nextYear.toString(), value: nextYear.toString() }
];

const seasons = [
    { key: "Fall", value: "Fall" },
    { key: "Winter", value: "Winter" },
    { key: "Spring", value: "Spring" },
    { key: "Summer1", value: "Summer1" },
    { key: "Summer2", value: "Summer2" },
    { key: "Summer10wk", value: "Summer10wk" },
]

const getCurrentQuarter = () => {
    const today = new Date();
    const month = today.getMonth();

    switch (month) {
        case month >= 8 && month <= 11:
            return seasons[0]
        case month >= 0 && month <= 2:
            return seasons[1]
        case month >= 3 && month <= 5:
            return seasons[2]
        default:
            return seasons[0]
    }
};

const getDay = () => {
    const today = new Date()
    const day = today.getDay()
    if (day == 0 || day == 6) {
        return 0
    }
    return day - 1
}

export { data, years, seasons, getCurrentQuarter, getDay }