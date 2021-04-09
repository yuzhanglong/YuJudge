/*
 * File: zh-CN.ts
 * Description: 中文语言模块
 * Created: 2021-4-8 00:14:38
 * Author: yuzhanglong
 * Email: yuzl1123@163.com
 */

export const enUS = {
  'localName': 'zh-CN',
  'current': 'The current',
  'unlimited': 'unlimited',
  'switch': 'switch',
  'close': 'Shut down',
  'open': 'open',
  'confirm': 'determine',
  'condition': 'state',
  'name': 'The name of the',
  'edit': 'The editor',
  'operation': 'operation',
  'seeDetail': 'Check the details',
  'analysis': 'Data statistics',
  'delete': 'delete',
  'cancel': 'cancel',
  'createTime': 'Creation time',
  'startTime': 'The start time',
  'deadline': 'By the time',
  'save': 'save',
  'and': 'Etc.',
  'create': 'create',
  'go': 'To travel to',
  'yes': 'is',
  'no': 'no',
  'submit': 'submit',
  'clear': 'empty',
  'header': {
    'home': 'Home page',
    'problem': 'The problem',
    'problemSet': 'The questions set',
    'preview': 'An overview of',
    'total': 'All questions',
    'scoreBoard': 'The scoreboard',
    'analysis': 'statistical'
  },
  'dashboardSide': {
    'base': 'The console',
    'settings': 'Set up the',
    'judgeHosts': 'Sentenced to problem machine',
    'detail': 'Details of the test machine',
    'userGroup': 'Users & user groups',
    'problemAndProblemSet': 'Topics & topic sets',
    'problemManager': 'Subject management',
    'problemSetManage': 'Topic set management',
    'problemEdit': 'The title to edit',
    'problemSetEdit': 'Topic set editing',
    'userManage': 'User management',
    'userGroupManage': 'User Group Management'
  },
  'settingPage': {
    'baseCard': 'System Settings',
    'commonZoneTitle': 'General items',
    'dangerZoneTitle': 'Dangerous items',
    'setConcurrency': 'Sets the number of simultaneous tests to run',
    'setConcurrencyDesc': 'The number of questions to run simultaneously can be modified according to the actual configuration',
    'setGapTime': 'Set the time between submissions',
    'setLanguage': 'Set the language',
    'submissionFrequencyText': 'The time (in seconds) between user commits, which is used to prevent malicious calls to the interface and frequent commits',
    'checkCodeInfo': 'Enable/disable CAPTCHA function',
    'checkCodeDetail': 'If closed, the website login, registration verification code will be invalid',
    'closeAll': 'Shut down all question marking services',
    'closeAllInfo': 'All users will not be able to submit code to the test machine',
    'setSuccess': 'Set up the success',
    'setFailed': 'Setup failed'
  },
  'judgeHost': {
    'baseCard': 'All test machines',
    'commonZoneTitle': 'General items',
    'dangerZoneTitle': 'Dangerous items',
    'cpuCoreAmount': 'Number of CPU core',
    'currentJudgeAmount': 'The number of current tests',
    'currentQueueSize': 'Current queue number',
    'cpuCost': 'CPU consumption',
    'memoryCost': 'Memory consumption',
    'newJudgeHost': 'Create a new test machine',
    'basicInfo': 'The basic information',
    'close': 'Shut down the test server',
    'closeDesc': 'The test server will not accept any more tasks until it is restarted',
    'delete': 'Delete the test server',
    'deleteDetail': 'Note: This operation is not recoverable',
    'createSuccess': 'Creating a successful',
    'running': 'In the operation of the',
    'noConnection': 'There is no connection',
    'stopped': 'Has suspended',
    'id': 'Serial number',
    'address': 'address',
    'port': 'The port number',
    'cpuCoreSize': 'Number of CPU core',
    'version': 'Test machine version',
    'saveDir': 'The solution holds the directory',
    'scriptSaveDir': 'The directory where the script is stored',
    'connection': 'Connection status',
    'connectSuccess': 'The connection is successful',
    'connectFail': 'The connection fails',
    'currentNoConnection': 'The test server has no connection'
  },
  'problemSet': {
    'base': 'The questions set',
    'basic': 'Overview of Problem Set',
    'baseCard': 'Topic set management',
    'id': 'The questions set ID',
    'name': 'Title of subject set',
    'preference': 'Sentenced to topic preference',
    'languageSupport': 'Support language',
    'author': 'The creator',
    'desc': 'Title set description',
    'create': 'Creating a Problem Set',
    'onlyShowActive': 'Shows only the active title set',
    'success': 'Create topic set successfully',
    'fail': 'Failed to create topic set',
    'search': 'Search topic set',
    'setDate': 'Set the time limit',
    'edit': 'Edit the topic set',
    'delete': 'Delete this problem set',
    'deleteWarn': 'This operation is not recoverable. Note: the title associated with it will not be deleted',
    'removeFromProblemSet': 'Remove it from the problem set',
    'removeConfirm': 'Are you sure you want to remove this question from the problem set',
    'danger': 'Dangerous items',
    'basicInfo': 'The basic information',
    'addProblem': 'Adding existing issues',
    'ownProblem': 'Adding existing issues',
    'editSuccess': 'Edit success',
    'removeSuccess': 'Remove the success',
    'forbidden': 'This topic set is inaccessible',
    'see': 'Look at problems',
    'action': 'ongoing',
    'started': 'Have begun to',
    'wait': 'Not at the',
    'condition': 'Topic set state',
    'isPublic': 'Whether or not the topic set is public'
  },
  'problemManage': {
    'baseCard': 'Subject management',
    'createProblem': 'Create a problem',
    'inputName': 'Please enter name'
  },
  'problem': {
    'base': 'The title',
    'order': 'The serial number',
    'id': 'The subject ID',
    'name': 'Name of the problem',
    'tag': 'Question tags',
    'edit': 'Editing problems',
    'timeLimit': 'The time limit',
    'memoryLimit': 'Memory limit',
    'outputLimit': 'Limit the output',
    'addProblem': 'Add a question',
    'addSuccess': 'Add a success',
    'desc': 'The content description',
    'willProblemAddToProblemSet': 'The following topics will be added to the topic set:',
    'addProblemToProblemSet': 'Adds a question to the topic set',
    'addSelectedProblem': 'Adds the selected question to the topic set',
    'problemWord': 'Problem keyword or ID',
    'isPublic': 'Whether the public',
    'languageSupport': 'Support language',
    'submitSuccess': 'Submitted successfully',
    'problemNotExist': 'The problem does not exist',
    'total': 'All questions',
    'timeCost': 'Time consumption',
    'memoryCost': 'Memory consumption',
    'testCase': 'Test point'
  },
  'user': {
    'baseCard': 'User management',
    'name': 'The user name',
    'group': 'User Group',
    'email': 'email',
    'operation': 'operation',
    'allocateGroup': 'Assign User Groups',
    'hasAllocate': 'The assigned user group',
    'allocateSuccess': 'Distribution of success',
    'allocateFail': 'Allocation failure',
    'canAllocateUserGroup': 'Groups of users that can be assigned',
    'userTypes': 'Filter user types',
    'all': 'Used by the user',
    'manager': 'System administrator',
    'commonUser': 'The average user',
    'problemManager': 'Manage topic sets/topics',
    'create': 'Create a user',
    'createSuccess': 'User created successfully',
    'rank': 'ranking',
    'acAmount': 'Number of AC',
    'submissionAmount': 'Submit the number',
    'chooseUserType': 'Select a user type',
    'totalUser': 'All users',
    'edit': 'Edit the user',
    'editSuccess': 'Edit success',
    'pleaseInputUser': 'Please enter a user name',
    'password': 'password',
    'newPassword': 'The new password',
    'pleaseInputPassword': 'Please enter your password.',
    'pleaseInputNewPassword': 'Please enter a new password',
    'passPercent': 'Pass rate'
  },
  'userGroup': {
    'name': 'The name of the',
    'desc': 'describe',
    'auth': 'authorization',
    'authSuccess': 'Authorization success',
    'create': 'Create a User Group',
    'edit': 'Edit user group',
    'authCanAllocate': 'Permissions available for assignment',
    'haveAllocated': 'Existing permissions',
    'pleaseInputName': 'Please enter name',
    'pleaseInputGroupName': 'Enter a user group name',
    'pleaseInputDesc': 'Please enter a user group description',
    'deleteConfirm': 'Confirm the deletion',
    'deleteQuestion': 'Are you sure you want to remove this user group',
    'deleteSuccess': 'User group removed successfully',
    'createSuccess': 'Creating a successful',
    'editSuccess': 'Edit success',
    'info': 'User group information'
  },
  'dashBoard': {
    'total': 'The total number of questions',
    'submission': 'The total number of submitted',
    'userAmount': 'The number of the user',
    'judgeCore': 'To question the core',
    'sevenDays': 'Submission in the past seven days',
    'tfHours': 'All stations submit within 24 hours',
    'recentProblem': 'The latest issue',
    'activeUser': 'Active users',
    'totalProblem': 'The total number of questions'
  },
  'basicResult': {
    'cannotFind': 'Target content could not be found',
    'loginError': 'Logon information has expired or no permissions',
    'gotoLogin': 'Go to the landing page',
    'goToHome': 'Return to the home page',
    'backProblemSet': 'Return to the home page of the topic set'
  },
  'home': {
    'notice': 'The announcement',
    'getNoticeError': 'Failed to get announcement',
    'recentUpdate': 'Recent updates',
    'inputProblemNumber': 'Enter the subject number',
    'daily': 'Daily sentence',
    'quickStart': 'Quick start',
    'activeUser': 'Active users',
    'loginSuccess': 'Login successful',
    'registerSuccess': 'After successful registration, you will automatically go to the login page 2 seconds later',
    'userLogin': 'The user login',
    'userRegister': 'User registration',
    'askRegister': 'No account? Let me register',
    'gotoLogin': 'To log in'
  },
  'languageTip': {
    'languageName': 'The name of the language',
    'compileScript': 'Compile the script',
    'pleaseSelect': 'Please select a',
    'tip': 'Language tips'
  },
  'routeSelector': { 'problem': 'The problem', 'submitRecode': 'Submit the record', 'solution': 'Answer key' },
  'count': { 'analysis': 'Data statistics', 'submitTrend': 'Submit the trend', 'timeAxis': 'The timeline' },
  'profile': {
    'userHome': 'Personal center',
    'passed': 'Have been through',
    'tried': 'tried',
    'recentSubmit': 'Recently submitted',
    'submissionAmount': 'Submit the number',
    'judgeTotal': 'Sentenced to topic statistics'
  },
  'scoreBoard': {
    'base': 'The scoreboard',
    'editSuccess': 'Modify the success',
    'downloadError': 'Download failed',
    'submission': 'submit',
    'submissionInfo': 'Submit information',
    'result': 'The results of',
    'lan': 'language',
    'host': 'Testing machine',
    'time': 'Submit time',
    'editJudgeResult': 'Modify the result',
    'editWarn': 'The administrator can modify the result of this question, please be careful',
    'oldRes': 'The original results',
    'newRes': 'Modified to',
    'addTag': 'Add a label',
    'rank': 'ranking',
    'team': 'Users/Teams',
    'penalty': 'When punishment',
    'cannotSubmit': 'No submissions for this time period'
  },
  'testCase': { 'id': 'ID', 'desc': 'describe', 'basicStdIn': 'The standard input', 'stdOut': 'The standard output' },
  'submissionInspect': {
    'cannotGetSubmission': 'Failed to get the submitted content',
    'submitTime': 'Submit time',
    'submitCondition': 'state',
    'submitCompiler': 'The compiler',
    'submitUser': 'Submitted to the user',
    'noOut': 'The compiler does not output O(∩_∩)O~',
    'seeSubmission': 'Check the submission',
    'time': 'Submit time',
    'stats': 'To the topic status',
    'preference': 'Sentenced to topic preference',
    'host': 'Sentenced to problem machine',
    'case': 'Test point',
    'code': 'The user code',
    'out': 'Compiler output'
  },
  'notice': { 'title': 'The title', 'author': 'The author', 'releaseTime': 'Release time' },
  'tagMenu': {
    'userInfo': 'Personal information',
    'cms': 'Background management',
    'logout': 'The cancellation',
    'lan': 'language',
    'logSuccess': 'You have successfully exited'
  }
}