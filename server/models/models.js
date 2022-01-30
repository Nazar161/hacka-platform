const sequelize = require('../db');
const {DataTypes} = require('sequelize');
const User = sequelize.define('user', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING, unique: true},
    is_activated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activation_link: {type: DataTypes.STRING}
});

const UserInfo = sequelize.define('user_info', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    organization: {type: DataTypes.STRING},
    portfolio: {type: DataTypes.TEXT},
    number_of_hackathons: {type: DataTypes.INTEGER},
    role_in_team: {type: DataTypes.TEXT},
    avatar: {type: DataTypes.STRING}
});

const Skill = sequelize.define('skill', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
});

const UserInfoSkill = sequelize.define('user_info_skill', {

});


User.hasOne(UserInfo, {foreignKey: 'user_id'});
UserInfo.belongsTo(User, {foreignKey: 'user_id'});

UserInfo.belongsToMany(Skill, {through: UserInfoSkill, foreignKey: 'skill_id'});
Skill.belongsToMany(UserInfo, {through: UserInfoSkill, foreignKey: 'user_info_id'});


const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    value: {type: DataTypes.STRING, allowNull: false, unique: true}
});

Role.hasMany(User, {foreignKey: 'role_id'});
User.belongsTo(Role, {foreignKey: {name: 'role_id', defaultValue: 1, allowNull: false}});

const Token = sequelize.define('token', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    refresh_token: {type: DataTypes.TEXT, unique: true}
});

User.hasOne(Token, {foreignKey: 'user_id'});
Token.belongsTo(User, {foreignKey: 'user_id'});

const Team = sequelize.define('team', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    achievements: {type: DataTypes.TEXT},
    // format_of_participation: {type: DataTypes.BOOLEAN, allowNull: false},
});

Team.hasMany(User, {foreignKey: 'team_id'});
User.belongsTo(Team, {foreignKey: 'team_id'});

const Curator = sequelize.define('curator', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true},
    phone: {type: DataTypes.STRING, unique: true},
});

Curator.hasMany(Team, {foreignKey: 'curator_id'});
Team.belongsTo(Curator, {foreignKey: 'curator_id'});

const Vacancy = sequelize.define('vacancies', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT},
})

Team.hasMany(Vacancy, {foreignKey: 'team_id'});
Vacancy.belongsTo(Team, {foreignKey: 'team_id'});

const VacancySkill = sequelize.define('vacancy_skill', {

});

Vacancy.belongsToMany(Skill, {through: VacancySkill, foreignKey: 'skill_id'});
Skill.belongsToMany(Vacancy, {through: VacancySkill, foreignKey: 'vacancy_id'})

const VacancyApplications = sequelize.define('vacancy_application', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    message: {type: DataTypes.TEXT},
})

const Status = sequelize.define('status', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    value: {type: DataTypes.STRING, unique: true, allowNull: false}
});

User.hasMany(VacancyApplications, {foreignKey: 'user_id'});
VacancyApplications.belongsTo(User, {foreignKey: 'user_id'});

Vacancy.hasMany(VacancyApplications, {foreignKey: 'vacancy_id'});
VacancyApplications.belongsTo(Vacancy, {foreignKey: 'vacancy_id'});

Status.hasMany(VacancyApplications, {foreignKey: 'status_id'});
VacancyApplications.belongsTo(Status, {foreignKey: 'status_id'});

const Case = sequelize.define('case', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    title: {type: DataTypes.STRING, allowNull: false, unique: true},
    description: {type: DataTypes.TEXT, allowNull: false},
    details: {type: DataTypes.TEXT, allowNull: false},
});

const TeamCases = sequelize.define('team_cases', {

});

Team.belongsToMany(Case, {through: TeamCases, foreignKey: 'case_id'});
Case.belongsToMany(Team, {through: TeamCases, foreignKey: 'team_id'});

const TeamCurrentCase = sequelize.define('team_current_case', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
})

Team.hasOne(TeamCurrentCase, {foreignKey: 'team_id'});
TeamCurrentCase.belongsTo(Team, {foreignKey: 'team_id'});

Case.hasMany(TeamCurrentCase, {foreignKey: 'case_id'});
TeamCurrentCase.belongsTo(Case, {foreignKey: 'case_id'});

const Solution = sequelize.define('solution', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    description: {type: DataTypes.TEXT, allowNull: false},
    src_link: {type: DataTypes.STRING},
    presentation: {type: DataTypes.STRING, allowNull: false},
});

Team.hasMany(Solution, {foreignKey: 'team_id'});
Solution.belongsTo(Team, {foreignKey: 'team_id'});

Case.hasMany(Solution, {foreignKey: 'case_id'});
Solution.belongsTo(Case, {foreignKey: 'case_id'});

const Subject = sequelize.define('subject', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    title: {type: DataTypes.STRING, allowNull: false, unique: true},
});

const CaseSubject = sequelize.define('case_subject', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
})

Case.belongsToMany(Subject, {through: CaseSubject, foreignKey: 'subject_id'});
Subject.belongsToMany(Case, {through: CaseSubject, foreignKey: 'case_id'});

const HackathonEvent = sequelize.define('hackathon_event', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    title: {type: DataTypes.STRING, allowNull: false, unique: true},
    start: {type: DataTypes.STRING, allowNull: false},
    end: {type: DataTypes.STRING, allowNull: false},
    prize_fund: {type: DataTypes.STRING},
    registration_is_closed: {type: DataTypes.BOOLEAN, allowNull: false},
    location: {type: DataTypes.STRING},
    // event_format: {type: DataTypes.BOOLEAN, allowNull: false},
    past_event: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
});

HackathonEvent.hasMany(Case, {foreignKey: 'hackathon_event_id'});
Case.belongsTo(HackathonEvent, {foreignKey: 'hackathon_event_id'});

const HackathonEventTeams = sequelize.define('hackathon_event_teams', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    team_confirmation: {type: DataTypes.BOOLEAN, defaultValue: false},
});

Team.hasMany(HackathonEventTeams, {foreignKey: 'team_id'});
HackathonEventTeams.belongsTo(Team, {foreignKey: 'team_id'});

HackathonEvent.hasMany(HackathonEventTeams, {foreignKey: 'hackathon_event_id'});
HackathonEventTeams.belongsTo(HackathonEvent, {foreignKey: 'hackathon_event_id'});

const Organizer = sequelize.define('organizer', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    name: {type: DataTypes.STRING, allowNull: false},
    link: {type: DataTypes.STRING}
});

const HackathonEventOrganizer = sequelize.define('hackathon_event_organizer', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
});

HackathonEvent.belongsToMany(Organizer, {through: HackathonEventOrganizer, foreignKey: 'organizer_id'});
Organizer.belongsToMany(HackathonEvent, {through: HackathonEventOrganizer, foreignKey: 'hackathon_event_id'});

const CaseOwner = sequelize.define('case_owner', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
});

Organizer.hasOne(CaseOwner, {foreignKey: 'organizer_id'});
CaseOwner.belongsTo(Organizer, {foreignKey: 'organizer_id'});

CaseOwner.hasMany(Case, {foreignKey: 'case_owner_id'});
Case.belongsTo(CaseOwner,{foreignKey: 'case_owner_id'});

const Partner = sequelize.define('partner', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    name: {type: DataTypes.STRING, allowNull: false},
    link: {type: DataTypes.STRING}
});

const HackathonEventPartner = sequelize.define('hackathon_event_partner', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
});

HackathonEvent.belongsToMany(Partner, {through: HackathonEventPartner, foreignKey: 'partner_id'});
Partner.belongsToMany(HackathonEvent, {through: HackathonEventPartner, foreignKey: 'hackathon_event_id'});

const CaseWinners = sequelize.define('case_winners', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    prize: {type: DataTypes.INTEGER},
});

Case.hasMany(CaseWinners, {foreignKey: 'case_id'});
CaseWinners.belongsTo(Case, {foreignKey: 'case_id'});

Team.hasMany(CaseWinners, {foreignKey: 'team_id'});
CaseWinners.belongsTo(Team, {foreignKey: 'team_id'});

HackathonEvent.hasMany(CaseWinners, {foreignKey: 'hackathon_event_id'});
CaseWinners.belongsTo(HackathonEvent, {foreignKey: 'hackathon_event_id'});

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    place: {type: DataTypes.INTEGER},
});

Rating.hasMany(CaseWinners, {foreignKey: 'rating_id'});
CaseWinners.belongsTo(Rating, {foreignKey: 'rating_id'});


const Format = sequelize.define('format', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    value: {type: DataTypes.STRING},
});

Format.hasMany(Team, {foreignKey: 'format_id'});
Team.belongsTo(Format, {foreignKey: 'format_id'});

Format.hasMany(HackathonEvent, {foreignKey: 'format_id'});
HackathonEvent.belongsTo(Format, {foreignKey: 'format_id'});

const ReqForNewHacka = sequelize.define('req_for_new_hacka', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    name_hacka: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING},
    event_site: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING, allowNull: false},
});

module.exports = {
    User,
    UserInfo,
    Skill,
    UserInfoSkill,
    Role,
    Token,
    Team,
    Curator,
    Vacancy,
    VacancyApplications,
    Case,
    TeamCases,
    TeamCurrentCase,
    Solution,
    Subject,
    CaseSubject,
    HackathonEvent,
    HackathonEventTeams,
    Organizer,
    HackathonEventOrganizer,
    CaseOwner,
    Partner,
    HackathonEventPartner,
    CaseWinners,
    Rating,
    Format,
    Status,
    ReqForNewHacka,
}//28