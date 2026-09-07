/* ============================================================
   projects-data.js · fonte única de dados dos projetos (PT/EN).
   Paths relativos à raiz do site; prefixados com SITE_ROOT
   no momento do render (compatível com GitHub Pages em subdiretório).
   ============================================================ */

window.PROJECTS = [
  {
    slug: 'simoldes-infrastructure-security',
    img: 'assets/images/simoldestooldivision_logo.jpg',
    imgContain: true,
    cats: ['infrastructure', 'security', 'professional'],
    catLabel: { pt: 'Infraestrutura · Segurança', en: 'Infrastructure · Security' },
    tags: ['Wazuh', 'CrowdStrike', 'FortiGate', 'Zabbix', 'NIST SP 800-53', 'CIS v8'],
    title: { pt: 'Segurança & Infra · Simoldes Tools', en: 'Security & Infra · Simoldes Tools' },
    desc: {
      pt: 'Hardening Wazuh SIEM em produção com 19 agentes ativos. CrowdStrike Falcon EDR via pipeline Python. FortiGate, Office 365, CIS v8 e NIST SP 800-53. 39 mapas Zabbix em 8 unidades industriais.',
      en: 'Wazuh SIEM hardening in production with 19 active agents. CrowdStrike Falcon EDR via Python pipeline. FortiGate, Office 365, CIS v8 and NIST SP 800-53. 39 Zabbix maps across 8 industrial units.'
    },
    year: '2026',
    conf: true,
    caseStudy: true,
    links: [
      { label: { pt: 'Case study', en: 'Case study' }, slug: true },
      { label: { pt: 'NDA · sob pedido', en: 'NDA · on request' }, mute: true }
    ]
  },
  {
    slug: 'madap',
    img: 'assets/images/b657477973c506dcc1f7136326a248fc.webp',
    imgContain: true,
    imgBg: '#ffffff',
    cats: ['development', 'web', 'professional'],
    catLabel: { pt: 'Profissional', en: 'Professional' },
    status: { pt: 'Em desenvolvimento', en: 'In development' },
    tags: ['F#', 'Fable', 'React', 'Giraffe', 'PostgreSQL'],
    title: { pt: 'MADAP Auto Parts & Rentals', en: 'MADAP Auto Parts & Rentals' },
    desc: {
      pt: 'Plataforma web para peças automóveis, aluguer e gestão interna, desenvolvida para uma empresa no Luxemburgo.',
      en: 'Web platform for automotive parts, rentals and internal management, currently being developed for a company in Luxembourg.'
    },
    year: '2026',
    caseStudy: true,
    links: [{ label: { pt: 'Ver projeto', en: 'View project' }, slug: true }]
  },
  {
    slug: 'moliceiros-da-ria',
    img: 'assets/images/Moliceiros.png',
    cats: ['infrastructure', 'networking', 'academic'],
    catLabel: { pt: 'Infraestrutura · Redes', en: 'Infrastructure · Networking' },
    tags: ['VPN', 'VoIP', 'Zabbix', 'OSPF', 'Docker'],
    title: { pt: 'Projeto Final RSI · Moliceiros da Ria', en: 'RSI Final Project · Moliceiros da Ria' },
    desc: {
      pt: 'Infraestrutura empresarial completa multi-site com VLANs, OSPF, VPN site-to-site, VoIP com Asterisk, DHCP, DNS, NAT, Zabbix + Grafana e Docker.',
      en: 'Complete multi-site enterprise infrastructure with VLANs, OSPF, site-to-site VPN, VoIP with Asterisk, DHCP, DNS, NAT, Zabbix + Grafana and Docker.'
    },
    year: '2025',
    caseStudy: true,
    links: [
      { label: { pt: 'Case study', en: 'Case study' }, slug: true },
      { label: { pt: 'Relatório', en: 'Report' }, href: 'assets/documents/Moliceiros da Ria.pdf' }
    ]
  },
  {
    slug: 'luxtis',
    img: 'assets/images/luxtis.png',
    imgContain: true,
    cats: ['development', 'web', 'professional'],
    catLabel: { pt: 'Desenvolvimento', en: 'Development' },
    tags: ['React 19', 'Vite', 'Website'],
    title: { pt: 'LUXTIS · Website Corporativo', en: 'LUXTIS · Corporate Website' },
    desc: {
      pt: 'Website corporativo para empresa de iluminações festivas. Desenvolvido com React 19 e Vite, com design responsivo e animações.',
      en: 'Corporate website for a festive lighting company. Built with React 19 and Vite, with responsive design and animations.'
    },
    year: '2026',
    caseStudy: true,
    links: [
      { label: { pt: 'Case study', en: 'Case study' }, slug: true },
      { label: { pt: 'Ver Site', en: 'Visit Site' }, href: 'https://luxtis.pt/', ext: true }
    ]
  },
  {
    img: 'assets/images/administracao.png',
    cats: ['infrastructure', 'security', 'academic'],
    catLabel: { pt: 'Infraestrutura · Automação', en: 'Infrastructure · Automation' },
    tags: ['Terraform', 'Ansible', 'Azure', 'NGINX'],
    title: { pt: 'Administração de Sistemas', en: 'Systems Administration' },
    desc: {
      pt: 'Correção de credenciais expostas e configuração NGINX via Terraform e Ansible. Servidor DHCP Linux no Azure totalmente automatizado.',
      en: 'Exposed-credentials remediation and NGINX configuration via Terraform and Ansible. Fully automated Linux DHCP server on Azure.'
    },
    year: '2025',
    links: [
      { label: { pt: 'Ex. 1', en: 'Ex. 1' }, href: 'https://github.com/JPagear/final_assignment-127140', ext: true },
      { label: { pt: 'Ex. 2', en: 'Ex. 2' }, href: 'https://github.com/JPagear/127140-dhcp-azure', ext: true }
    ]
  },
  {
    img: 'assets/images/Gemini_Generated_Image_k0aatfk0aatfk0aa.png',
    cats: ['development', 'academic'],
    catLabel: { pt: 'Desenvolvimento', en: 'Development' },
    tags: ['Sockets', 'Threads', 'Linux'],
    title: { pt: 'Sistemas Operativos · Semáforos', en: 'Operating Systems · Traffic Lights' },
    desc: {
      pt: 'Sistema distribuído de controlo de semáforos. Cliente-servidor via sockets, multithreading e sincronização entre interseções em ambiente Linux.',
      en: 'Distributed traffic-light control system. Client-server over sockets, multithreading and synchronization between intersections on Linux.'
    },
    year: '2024',
    links: [
      { label: { pt: 'Relatório', en: 'Report' }, href: 'assets/documents/André_Lima_João_Almeida_Relatório.pdf' },
      { label: { pt: 'GitHub', en: 'GitHub' }, href: 'https://github.com/JPagear/semaforos', ext: true }
    ]
  },
  {
    img: 'assets/images/Gemini_Generated_Image_nf5j9znf5j9znf5j.png',
    cats: ['development', 'academic'],
    catLabel: { pt: 'Desenvolvimento', en: 'Development' },
    tags: ['Bash', 'Backups', 'Linux'],
    title: { pt: 'Sistemas Operativos · Shell Script', en: 'Operating Systems · Shell Script' },
    desc: {
      pt: 'Sistema de gestão de backups com verificação de integridade, controlo de espaço em disco e log persistente de operações.',
      en: 'Backup management system with integrity checking, disk-space control and persistent operation logging.'
    },
    year: '2024',
    links: [
      { label: { pt: 'Relatório', en: 'Report' }, href: 'assets/documents/Relatório_Trabalho_Prático_JoãoAlmeida_AndréLima.pdf' },
      { label: { pt: 'GitHub', en: 'GitHub' }, href: 'https://github.com/JPagear/-gest-o-de-backups-', ext: true }
    ]
  },
  {
    img: 'assets/images/Gemini_Generated_Image_9zw4419zw4419zw4.png',
    cats: ['development', 'academic'],
    catLabel: { pt: 'Desenvolvimento', en: 'Development' },
    tags: ['Python', 'RFID', 'API'],
    title: { pt: 'Programação Aplicada · Weather2Travel', en: 'Applied Programming · Weather2Travel' },
    desc: {
      pt: 'Aplicação Python com login por cartão RFID e previsão meteorológica via API do IPMA. Interface CustomTkinter e base de dados de utilizadores.',
      en: 'Python application with RFID card login and weather forecasts via the IPMA API. CustomTkinter interface and user database.'
    },
    year: '2024',
    links: [
      { label: { pt: 'Relatório', en: 'Report' }, href: 'assets/documents/Projeto-Versão Final.pdf' },
      { label: { pt: 'GitHub', en: 'GitHub' }, href: 'https://github.com/JPagear/Pogram-Aplicada-127140', ext: true }
    ]
  },
  {
    img: 'assets/images/Gemini_Generated_Image_28ar0l28ar0l28ar.png',
    cats: ['development', 'academic'],
    catLabel: { pt: 'Desenvolvimento', en: 'Development' },
    tags: ['Microserviços', 'Docker', 'Prometheus', 'Loki'],
    title: { pt: 'Sistemas Distribuídos · Microserviços', en: 'Distributed Systems · Microservices' },
    desc: {
      pt: 'Sistema de gestão de pedidos com API Gateway, REST, Prometheus, Grafana e Loki, orquestrado com Docker Compose.',
      en: 'Order management system with API Gateway, REST, Prometheus, Grafana and Loki, orchestrated with Docker Compose.'
    },
    year: '2025',
    links: [
      { label: { pt: 'Relatório', en: 'Report' }, href: 'assets/documents/SD - Guia 8 - Projeto final.pdf' },
      { label: { pt: 'GitHub', en: 'GitHub' }, href: 'https://github.com/Alpine5096/Projeto-Sistemas-Distribuidos-127878-127140', ext: true }
    ]
  },
  {
    img: 'assets/images/Gemini_Generated_Image_3mdbq3mdbq3mdbq3.png',
    cats: ['infrastructure', 'networking', 'academic'],
    catLabel: { pt: 'Infraestrutura · Redes', en: 'Infrastructure · Networking' },
    tags: ['Asterisk', 'SIP', 'RADIUS'],
    title: { pt: 'VoIP · Asterisk, DNS & RADIUS', en: 'VoIP · Asterisk, DNS & RADIUS' },
    desc: {
      pt: 'Infraestrutura VoIP com PBX Asterisk, DNS via Bind9, autenticação FreeRADIUS e terminais SIP.',
      en: 'VoIP infrastructure with Asterisk PBX, DNS via Bind9, FreeRADIUS authentication and SIP endpoints.'
    },
    year: '2025',
    links: [{ label: { pt: 'Relatório', en: 'Report' }, href: 'assets/documents/RELATÓRIO infraestrutura Voip.pdf' }]
  },
  {
    img: 'assets/images/Gemini_Generated_Image_ywoxlkywoxlkywox.png',
    cats: ['networking', 'academic'],
    catLabel: { pt: 'Redes', en: 'Networking' },
    tags: ['Telemática', 'Redes'],
    title: { pt: 'Serviços Telemáticos', en: 'Telematic Services' },
    desc: {
      pt: 'Configuração e análise de serviços de comunicação em rede, protocolos de transporte e integração telemática em laboratório.',
      en: 'Configuration and analysis of network communication services, transport protocols and telematic integration in the lab.'
    },
    year: '2025',
    links: [{ label: { pt: 'Relatório', en: 'Report' }, href: 'assets/documents/Relatório_ST.pdf' }]
  },
  {
    img: 'assets/images/Gemini_Generated_Image_m8wgm8m8wgm8m8wg.png',
    cats: ['networking', 'academic'],
    catLabel: { pt: 'Redes', en: 'Networking' },
    tags: ['TCP/IP', 'DHCP', 'DNS', 'NAT'],
    title: { pt: 'Fundamentos de Rede · Universitária', en: 'Network Fundamentals · University' },
    desc: {
      pt: 'Rede universitária segmentada por departamentos com sub-redes IPv4, DHCP, DNS, NAT, FTP, servidor web/email, RIP e datacenter central.',
      en: 'University network segmented by department with IPv4 subnets, DHCP, DNS, NAT, FTP, web/email server, RIP and a central datacenter.'
    },
    year: '2024',
    links: [{ label: { pt: 'Relatório', en: 'Report' }, href: 'assets/documents/Relatório_projetofinal_fundamentosderedes4.pdf' }]
  },
  {
    img: 'assets/images/Gemini_Generated_Image_sejtdysejtdysejt.png',
    cats: ['networking', 'academic'],
    catLabel: { pt: 'Redes', en: 'Networking' },
    tags: ['VLANs', 'OSPF', 'GNS3'],
    title: { pt: 'Planeamento de Redes · BikeParts', en: 'Network Planning · BikeParts' },
    desc: {
      pt: 'Rede multi-edifício com VLANs por departamento, OSPF, NAT, redes guest isoladas e arquitetura em camadas simulada em GNS3.',
      en: 'Multi-building network with per-department VLANs, OSPF, NAT, isolated guest networks and a layered architecture simulated in GNS3.'
    },
    year: '2025',
    links: [{ label: { pt: 'Relatório', en: 'Report' }, href: 'assets/documents/Relatório_projetofinal_PlaneamentoRedes_Andrelima_JoaoAlmeida-1.pdf' }]
  },
  {
    img: 'assets/images/Gemini_Generated_Image_m9e7dgm9e7dgm9e7.png',
    cats: ['infrastructure', 'networking', 'academic'],
    catLabel: { pt: 'Infraestrutura · Redes', en: 'Infrastructure · Networking' },
    tags: ['Zabbix', 'Prometheus', 'SNMP'],
    title: { pt: 'Gestão de Redes · Zabbix vs Prometheus', en: 'Network Management · Zabbix vs Prometheus' },
    desc: {
      pt: 'Análise comparativa entre Zabbix e Prometheus com SNMP, ICMP e APIs, e implementação prática com alertas e métricas.',
      en: 'Comparative analysis of Zabbix and Prometheus with SNMP, ICMP and APIs, plus a hands-on implementation with alerts and metrics.'
    },
    year: '2025',
    links: [{ label: { pt: 'Relatório', en: 'Report' }, href: 'assets/documents/Projeto de Gestão de Rede.pdf' }]
  }
];
