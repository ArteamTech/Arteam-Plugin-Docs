import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import {translate} from '@docusaurus/Translate'

const FeatureList = [
    {
        trim: translate({
            id: 'features.1.tag',
            message: '专业团队',
        }),
        title: translate({
            id: 'features.1.title',
            message: '专业开发',
        }),
        description: translate({
            id: 'features.1.description',
            message: "核心成员拥有丰富的MC插件开发经验，精通主流服务端框架，致力于提供高质量插件。"
        }),
    },
    {
        trim: translate({
            id: 'features.2.tag',
            message: '功能丰富',
        }),
        title: translate({
            id: 'features.2.title',
            message: '功能强大',
        }),
        description: translate({
            id: 'features.2.description',
            message: "我们的插件设计高效且功能丰富，适用于各种服务器场景，满足不同需求，持续更新与优化。"
        }),
    },
    {
        trim: translate({
            id: 'features.3.tag',
            message: '开源共享',
        }),
        title: translate({
            id: 'features.3.title',
            message: '开源共享',
        }),
        description: translate({
            id: 'features.3.description',
            message: "ArTeam 插件在 GitHub 上完全开源，欢迎社区贡献，共同进步。"
        }),
    },
];

function Feature({Svg, title, trim, description}) {
  return (
    <div className={clsx('col col--4')}>

      <div className="text--center">
        <h4 className='subColor'>「 {trim} 」</h4>
      </div>

      <div className="text--center padding-horiz--md">
        <h1 className='mainColor'>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
