import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import HomepageFeatures from '../components/HomepageFeatures';

import styles from './index.module.css';

function Banner() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div className={styles.banner}>
      <div className={styles.bannerInner}>
        <div className={styles.bannerContent}>
          <h1 className={styles.bannerTitle}>{siteConfig.title}</h1>
          <div className={styles.bannerSubtitleWrapper}>
            <p className={styles.bannerSubtitle}>
              <Translate>专注于我的世界插件开发的创新团队</Translate>
            </p>
          <p className={styles.bannerSubtitle}>
              <Translate>为您的服务器提供高质量插件</Translate>
          </p>
          </div>
          <div className={styles.bannerButtons}>
                <Link
              className={`${styles.bannerButton} ${styles.primaryButton}`}
                    to="/docs/about">
              <span className={styles.buttonIcon}>📚</span>
              <Translate>快速开始</Translate>
            </Link>
            <Link
              className={`${styles.bannerButton} ${styles.secondaryButton}`}
              to="/download">
              <span className={styles.buttonIcon}>📦</span>
              <Translate>立即下载</Translate>
                </Link>
            </div>
        </div>
        <div className={styles.bannerImageContainer}>
          <img 
            src="img/arteam_logo.png" 
            alt="ArTeam Logo" 
            className={styles.bannerImage}
          />
        </div>
      </div>
    </div>
  );
}

// 轮播图组件
function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "https://via.placeholder.com/1200x400?text=ArLibs&font-size=30&bg=2ecc71&color=white",
      title: "ArLibs - 基础工具库",
      description: "提供常用MC开发工具类，包含NMS适配、数据存储、事件监听等基础功能"
    },
    {
      image: "https://via.placeholder.com/1200x400?text=ArMenu&font-size=30&bg=3498db&color=white",
      title: "ArMenu - 多功能菜单插件",
      description: "支持自定义GUI菜单、按钮交互逻辑、权限控制"
    },
    {
      image: "https://via.placeholder.com/1200x400?text=ArChat&font-size=30&bg=e74c3c&color=white",
      title: "ArChat - 高级聊天插件",
      description: "包含聊天记录、消息过滤、玩家聊天权限管理等功能，支持实时日志审计"
    }
  ];

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className={styles.carousel}>
      <div 
        className={styles.carouselImages} 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className={styles.carouselSlide} style={{ backgroundImage: `url(${slide.image})` }}>
            <div className={styles.slideContent}>
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button className={`${styles.carouselControl} ${styles.prevButton}`} onClick={prevSlide}>
        &lsaquo;
      </button>
      <button className={`${styles.carouselControl} ${styles.nextButton}`} onClick={nextSlide}>
        &rsaquo;
      </button>
      <div className={styles.carouselDots}>
        {slides.map((_, index) => (
          <button 
            key={index} 
            className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

// 文档卡片组件
function DocCards() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const docItems = [
    {
      title: "ArLibs - 基础工具库",
      description: "提供常用MC开发工具类，包含NMS适配、数据存储、事件监听等基础功能",
      type: "dev",
      links: [
        { label: "开发者文档", href: "/ArLibs", type: "dev" }
      ]
    },
    {
      title: "ArMenu - 多功能菜单插件",
      description: "支持自定义GUI菜单、按钮交互逻辑、权限控制，兼容1.16-1.20版本",
      type: "server dev",
      links: [
        { label: "服主使用指南", href: "/ArMenu", type: "server" },
        { label: "开发者API文档", href: "/ArMenu/dev", type: "dev" }
      ]
    },
    {
      title: "ArChat - 高级聊天插件",
      description: "包含聊天记录、消息过滤、玩家聊天权限管理等功能，支持实时日志审计",
      type: "server",
      links: [
        { label: "服主使用指南", href: "/ArChat", type: "server" },
        { label: "开发者文档", href: "/ArChat/dev", type: "dev" }
      ]
    }
  ];
  
  const filteredDocs = docItems.filter(item => 
    activeFilter === 'all' || item.type.includes(activeFilter)
  );
  
  return (
    <div className={styles.docSection}>
      <h2 className={styles.sectionTitle}>插件文档</h2>
      
      <div className={styles.docFilter}>
        <button 
          className={`${styles.filterButton} ${activeFilter === 'all' ? styles.activeFilter : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          所有文档
        </button>
        <button 
          className={`${styles.filterButton} ${activeFilter === 'server' ? styles.activeFilter : ''}`}
          onClick={() => setActiveFilter('server')}
        >
          服主文档
        </button>
        <button 
          className={`${styles.filterButton} ${activeFilter === 'dev' ? styles.activeFilter : ''}`}
          onClick={() => setActiveFilter('dev')}
        >
          开发者文档
        </button>
      </div>
      
      <div className={styles.docCards}>
        {filteredDocs.map((doc, index) => (
          <div key={index} className={styles.docCard}>
            <h3>{doc.title}</h3>
            <p>{doc.description}</p>
            <div className={styles.docLinks}>
              {doc.links.map((link, linkIndex) => (
                <Link 
                  key={linkIndex}
                  to={link.href}
                  className={`${styles.docLink} ${styles[link.type]}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 团队优势组件
function TeamAdvantages() {
  const advantages = [
    {
      icon: "🛠️",
      title: "专业开发团队",
      description: "核心成员拥有丰富的MC插件开发经验，精通Spigot/Paper/Bukkit等主流框架"
    },
    {
      icon: "🚀",
      title: "全周期技术支持",
      description: "提供从需求分析到插件上线的一站式服务，专属技术支持"
    },
    {
      icon: "🔄",
      title: "持续迭代更新",
      description: "定期发布插件功能更新和性能优化，完美适配各版本服务端核心"
    }
  ];
  
  return (
    <div className={styles.advantageSection}>
      <h2 className={styles.sectionTitle}>我们的优势</h2>
      <div className={styles.advantageCards}>
        {advantages.map((advantage, index) => (
          <div key={index} className={styles.advantageCard}>
            <div className={styles.advantageIcon}>{advantage.icon}</div>
            <h3>{advantage.title}</h3>
            <p>{advantage.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={translate({
        id: 'site.title',
        message: '主页',
      })}
      description={translate({
        id: 'Versatile and flexible GUI creation plugin',
        message: '我的世界插件文档中心',
      })}>
      <main>
        <Banner />
        <div className={styles.mainContent}>
          <Carousel />
          <DocCards />
          <TeamAdvantages />
          <HomepageFeatures />
        </div>
      </main>
    </Layout>
  );
}
