"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "../../components/MainLayout";
import styles from "./dashboard.module.css";
import { 
  FaTrophy, FaCalendarCheck, FaFire, 
  FaChartLine, FaBookOpen, FaLock
} from "react-icons/fa";
import useLessonStore from "../../store/useLessonStore";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { progressData } = useLessonStore();
  
  const [dailyStreak, setDailyStreak] = useState(7);
  const [totalLessons, setTotalLessons] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [topCategory, setTopCategory] = useState("Greetings");

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Calculate stats
  useEffect(() => {
    // Count total lessons from progressData or set a default value
    setTotalLessons(28); // Example value
    setCompletedLessons(progressData ? Object.keys(progressData).length : 0);
    
    // Other data calculations would go here
    // This is where you'd analyze user progress data
  }, [progressData]);

  // Loading state
  if (status === "loading") {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  // Get user's first name
  const getFirstName = () => {
    if (session?.user?.name) {
      return session.user.name.split(' ')[0];
    }
    return session?.user?.email?.split('@')[0] || 'User';
  };

  // Calculate progress percentage
  const progressPercentage = totalLessons > 0 
    ? Math.round((completedLessons / totalLessons) * 100) 
    : 0;

  // Sample data for recent activities
  const recentActivities = [
    { 
      id: 1, 
      title: "Greetings Basics", 
      type: "Lesson", 
      date: "Today", 
      score: "8/10"
    },
    { 
      id: 2, 
      title: "Numbers 1-10", 
      type: "Quiz", 
      date: "Yesterday", 
      score: "100%"
    },
    { 
      id: 3, 
      title: "Family Members", 
      type: "Lesson", 
      date: "3 days ago", 
      score: "Completed"
    },
  ];

  // Sample data for achievements
  const achievements = [
    { 
      id: 1, 
      title: "First Lesson", 
      description: "Completed your first lesson", 
      unlocked: true 
    },
    { 
      id: 2, 
      title: "Weekly Streak", 
      description: "Learn for 7 days in a row", 
      unlocked: true 
    },
    { 
      id: 3, 
      title: "Vocabulary Master", 
      description: "Learn 100 words", 
      unlocked: false,
      progress: 37
    },
  ];

  return (
    <MainLayout activePage="dashboard">
      <div className={styles.dashboardContainer}>
        <header className={styles.dashboardHeader}>
          <h1 className={styles.greeting}>
            Mwaramutse, <span className="gradient-text">{getFirstName()}</span>!
          </h1>
          <p className={styles.subtitle}>Welcome to your learning dashboard</p>
        </header>

        <div className={styles.statsGrid}>
          {/* Progress Stat */}
          <div className={`${styles.statCard} ${styles.progressCard} glass-effect`}>
            <div className={styles.statContent}>
              <h3 className={styles.statTitle}>Overall Progress</h3>
              <div className={styles.circularProgress}>
                <svg className={styles.progressSvg} viewBox="0 0 100 100">
                  <circle className={styles.progressBg} cx="50" cy="50" r="40" />
                  <circle 
                    className={styles.progressFill} 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - progressPercentage / 100)}`}
                  />
                </svg>
                <div className={styles.progressText}>
                  {progressPercentage}%
                </div>
              </div>
              <div className={styles.progressDetail}>
                <span>{completedLessons} of {totalLessons} lessons completed</span>
              </div>
            </div>
          </div>

          {/* Streak Stat */}
          <div className={`${styles.statCard} glass-effect`}>
            <div className={styles.statIcon}>
              <FaFire />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statTitle}>Daily Streak</h3>
              <p className={styles.statValue}>{dailyStreak} days</p>
            </div>
          </div>

          {/* Category Stat */}
          <div className={`${styles.statCard} glass-effect`}>
            <div className={styles.statIcon}>
              <FaBookOpen />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statTitle}>Top Category</h3>
              <p className={styles.statValue}>{topCategory}</p>
            </div>
          </div>

          {/* Completed Stat */}
          <div className={`${styles.statCard} glass-effect`}>
            <div className={styles.statIcon}>
              <FaCalendarCheck />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statTitle}>Lessons Completed</h3>
              <p className={styles.statValue}>{completedLessons}</p>
            </div>
          </div>
        </div>

        <div className={styles.contentGrid}>
          {/* Recent Activity */}
          <section className={`${styles.recentActivity} ${styles.dashboardSection} glass-effect`}>
            <h2 className={styles.sectionTitle}>
              <FaChartLine className={styles.sectionIcon} />
              Recent Activity
            </h2>
            <ul className={styles.activityList}>
              {recentActivities.map(activity => (
                <li key={activity.id} className={styles.activityItem}>
                  <div className={styles.activityLeft}>
                    <span className={styles.activityType}>{activity.type}</span>
                    <h4 className={styles.activityTitle}>{activity.title}</h4>
                  </div>
                  <div className={styles.activityRight}>
                    <span className={styles.activityDate}>{activity.date}</span>
                    <span className={styles.activityScore}>{activity.score}</span>
                  </div>
                </li>
              ))}
            </ul>
            <button 
              className={`btn btn-secondary ${styles.viewMoreBtn}`}
              onClick={() => router.push('/history')}
            >
              View All Activity
            </button>
          </section>

          {/* Achievements */}
          <section className={`${styles.achievements} ${styles.dashboardSection} glass-effect`}>
            <h2 className={styles.sectionTitle}>
              <FaTrophy className={styles.sectionIcon} />
              Achievements
            </h2>
            <ul className={styles.achievementsList}>
              {achievements.map(achievement => (
                <li 
                  key={achievement.id} 
                  className={`${styles.achievementItem} ${!achievement.unlocked ? styles.locked : ''}`}
                >
                  <div className={styles.achievementIcon}>
                    {achievement.unlocked ? (
                      <FaTrophy />
                    ) : (
                      <FaLock />
                    )}
                  </div>
                  <div className={styles.achievementContent}>
                    <h4 className={styles.achievementTitle}>{achievement.title}</h4>
                    <p className={styles.achievementDesc}>{achievement.description}</p>
                    {!achievement.unlocked && achievement.progress && (
                      <div className={styles.achievementProgress}>
                        <div 
                          className={styles.achievementProgressBar}
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                        <span className={styles.achievementProgressText}>{achievement.progress}%</span>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <button 
              className={`btn btn-secondary ${styles.viewMoreBtn}`}
              onClick={() => router.push('/achievements')}
            >
              View All Achievements
            </button>
          </section>

          {/* Suggested Lessons */}
          <section className={`${styles.suggestedLessons} ${styles.dashboardSection} glass-effect`}>
            <h2 className={styles.sectionTitle}>Continue Learning</h2>
            
            <div className={styles.lessonCards}>
              <div className={`${styles.lessonCard} glass-effect`}>
                <div className={styles.lessonCardTop}>
                  <div className={styles.lessonCategory}>Greetings</div>
                  <div className={styles.lessonProgress}>2/5</div>
                </div>
                <h3 className={styles.lessonTitle}>Basic Introductions</h3>
                <p className={styles.lessonDesc}>Learn how to introduce yourself and greet others</p>
                <button 
                  className={`btn btn-primary ${styles.lessonContinueBtn}`}
                  onClick={() => router.push('/lessons/greetings-1')}
                >
                  Continue
                </button>
              </div>
              
              <div className={`${styles.lessonCard} glass-effect`}>
                <div className={styles.lessonCardTop}>
                  <div className={styles.lessonCategory}>Numbers</div>
                  <div className={styles.lessonProgress}>New</div>
                </div>
                <h3 className={styles.lessonTitle}>Counting 1-10</h3>
                <p className={styles.lessonDesc}>Master the basic numbers in Kinyarwanda</p>
                <button 
                  className={`btn btn-primary ${styles.lessonContinueBtn}`}
                  onClick={() => router.push('/lessons/numbers-1')}
                >
                  Start
                </button>
              </div>
            </div>
            
            <button 
              className={`btn btn-secondary ${styles.viewMoreBtn}`}
              onClick={() => router.push('/lessons')}
            >
              Browse All Lessons
            </button>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}