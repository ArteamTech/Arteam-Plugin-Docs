import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { translate } from '@docusaurus/Translate'

const FeatureList = [
    {
        title: translate({
            id: 'features.title',
            message: 'ArTeam',
        }),
        description: translate({
            id: 'features.description',
            message: "我们致力于为Minecraft服务器提供高质量、功能丰富的插件，所有项目均在GitHub开源，欢迎社区贡献。"
        }),
    }
];

function Feature({ title, description }) {
  return (
    <div className={clsx('col')}>
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
