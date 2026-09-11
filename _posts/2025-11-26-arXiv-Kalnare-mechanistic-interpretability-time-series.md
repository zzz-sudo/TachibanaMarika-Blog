---
layout: single
title: "文献精读 | 时间序列 Transformer 分类的机制可解释性"
date: 2025-11-26
categories:
  - 机器学习与深度学习
tags:
  - mechanistic
  - arXiv
  - 机器学习与深度学习
toc: true
---

> **核心速递：** 该研究把机制可解释工具迁移到时间序列 Transformer，定位关键头、时间点和潜在特征。

## 1. 论文基本信息
- **Title**: Mechanistic Interpretability for Transformer-based Time Series Classification
- **Journal**: arXiv
- **First Author**: Matīss Kalnāre
- **领域定位**: 机器学习与深度学习 / 关键方法论

## 2. 研究背景与痛点

Transformer 已用于时间序列分类，但多数解释仍是输入归因，无法说明内部模块如何产生预测。机制可解释性提供了更细粒度的因果探查工具。

## 3. 核心材料与方法

作者适配 activation patching、attention saliency 和 sparse autoencoders，系统探查 attention heads 与 timesteps 的因果作用，并构建信息传播 causal graph。

## 4. 关键发现与机制解析

### 4.1 核心结论一

activation patching 可揭示时间序列 Transformer 中关键 attention heads 和 timesteps。

### 4.2 核心结论二

内部信息传播可被构造成 causal graphs，帮助解释正确分类路径。

### 4.3 核心结论三

sparse autoencoders 有潜力发现可解释 latent features。

## 5. 局限性与未来展望

方法仍处早期，benchmark 范围有限；SAE 特征解释需要更多验证。 后续使用这类方法时，还需要关注数据来源、benchmark 设置、跨任务泛化和真实应用中的失败案例。对于 arXiv 预印本，也应持续跟踪正式发表版本、代码发布状态和社区复现情况。

## 6. 核心思考与研究启发

公开方法论启发在于，时间序列模型解释应关注内部计算路径。对于动态生物数据、传感器数据或临床序列，关键时间点与 latent feature 的因果探查比单纯特征重要性更有解释力。
