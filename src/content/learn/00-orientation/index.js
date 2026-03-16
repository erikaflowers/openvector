// Level 00: Orientation
// The foundational computer literacy that got skipped.

import whatIsZeroVector from './what-is-zero-vector';
import terminal from './terminal';
import fileSystems from './file-systems';
import gitBasics from './git-basics';
import repos from './repos';
import deployment from './deployment';
import dns from './dns';

export default {
  slug: '00-orientation',
  number: '00',
  title: 'Orientation',
  subtitle: 'What is this machine, actually?',
  status: 'available',
  desc: 'The foundational understanding that got skipped. What is a terminal. What is a file system. What is Git. The early computer stuff that nobody teaches designers because everyone assumes someone else already did.',
  prereqs: 'None. This is the starting line.',
  outcomes: [
    'Understand what Zero Vector Design is and what you are building toward',
    'Navigate your computer from the terminal',
    'Understand how files and folders are organized',
    'Use Git for version control',
    'Push code to a repository on GitHub',
    'Deploy a project to the internet',
    'Understand how domain names and DNS work',
  ],
  lessons: [
    whatIsZeroVector,
    terminal,
    fileSystems,
    gitBasics,
    repos,
    deployment,
    dns,
  ],
};
