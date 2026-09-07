/* ============================================================
   projects-data.js · fonte única de dados dos projetos.
   Paths relativos à raiz do site; prefixados com SITE_ROOT
   no momento do render (compatível com GitHub Pages em subdiretório).
   ============================================================ */

window.PROJECTS = [
  {
    slug: 'simoldes-infrastructure-security',
    img: 'assets/images/simoldestooldivision_logo.jpg',
    imgContain: true,
    cats: ['infrastructure', 'security', 'professional'],
    catLabel: 'Infrastructure · Security',
    tags: ['Wazuh', 'CrowdStrike', 'FortiGate', 'Zabbix', 'NIST SP 800-53', 'CIS v8'],
    title: 'Segurança & Infra · Simoldes Tools',
    desc: 'Hardening Wazuh SIEM em produção com 19 agentes ativos. CrowdStrike Falcon EDR via pipeline Python. FortiGate, Office 365, CIS v8 e NIST SP 800-53. 39 mapas Zabbix em 8 unidades industriais.',
    year: '2026 · Em curso',
    conf: true,
    caseStudy: true,
    links: [{ label: 'Case study', slug: true }, { label: 'NDA · sob pedido', mute: true }]
  },
  {
    slug: 'moliceiros-da-ria',
    img: 'assets/images/Moliceiros.png',
    cats: ['infrastructure', 'networking', 'academic'],
    catLabel: 'Infrastructure · Networking',
    tags: ['VPN', 'VoIP', 'Zabbix', 'OSPF', 'Docker'],
    title: 'Projeto Final RSI · Moliceiros da Ria',
    desc: 'Infraestrutura empresarial completa multi-site com VLANs, OSPF, VPN site-to-site, VoIP com Asterisk, DHCP, DNS, NAT, Zabbix + Grafana e Docker.',
    year: '2025',
    caseStudy: true,
    links: [{ label: 'Case study', slug: true }, { label: 'Relatório', href: 'assets/documents/Moliceiros da Ria.pdf' }]
  },
  {
    slug: 'luxtis',
    img: 'assets/images/luxtis.png',
    imgContain: true,
    cats: ['development', 'professional'],
    catLabel: 'Development',
    tags: ['React 19', 'Vite', 'Website'],
    title: 'LUXTIS · Website Corporativo',
    desc: 'Website corporativo para empresa de iluminações festivas. Desenvolvido com React 19 e Vite, com design responsivo e animações.',
    year: '2026',
    caseStudy: true,
    links: [{ label: 'Case study', slug: true }, { label: 'Ver Site', href: 'https://luxtis.pt/', ext: true }]
  },
  {
    img: 'assets/images/administracao.png',
    cats: ['infrastructure', 'security', 'academic'],
    catLabel: 'Infrastructure · Automation',
    tags: ['Terraform', 'Ansible', 'Azure', 'NGINX'],
    title: 'Administração de Sistemas',
    desc: 'Correção de credenciais expostas e configuração NGINX via Terraform e Ansible. Servidor DHCP Linux no Azure totalmente automatizado.',
    year: '2025',
    links: [
      { label: 'Ex. 1', href: 'https://github.com/JPagear/final_assignment-127140', ext: true },
      { label: 'Ex. 2', href: 'https://github.com/JPagear/127140-dhcp-azure', ext: true }
    ]
  },
  {
    img: 'assets/images/Gemini_Generated_Image_k0aatfk0aatfk0aa.png',
    cats: ['development', 'academic'],
    catLabel: 'Development',
    tags: ['Sockets', 'Threads', 'Linux'],
    title: 'Sistemas Operativos · Semáforos',
    desc: 'Sistema distribuído de controlo de semáforos. Cliente-servidor via sockets, multithreading e sincronização entre interseções em ambiente Linux.',
    year: '2024',
    links: [
      { label: 'Relatório', href: 'assets/documents/André_Lima_João_Almeida_Relatório.pdf' },
      { label: 'GitHub', href: 'https://github.com/JPagear/semaforos', ext: true }
    ]
  },
  {
    img: 'assets/images/Gemini_Generated_Image_nf5j9znf5j9znf5j.png',
    cats: ['development', 'academic'],
    catLabel: 'Development',
    tags: ['Bash', 'Backups', 'Linux'],
    title: 'Sistemas Operativos · Shell Script',
    desc: 'Sistema de gestão de backups com verificação de integridade, controlo de espaço em disco e log persistente de operações.',
    year: '2024',
    links: [
      { label: 'Relatório', href: 'assets/documents/Relatório_Trabalho_Prático_JoãoAlmeida_AndréLima.pdf' },
      { label: 'GitHub', href: 'https://github.com/JPagear/-gest-o-de-backups-', ext: true }
    ]
  },
  {
    img: 'assets/images/Gemini_Generated_Image_9zw4419zw4419zw4.png',
    cats: ['development', 'academic'],
    catLabel: 'Development',
    tags: ['Python', 'RFID', 'API'],
    title: 'Programação Aplicada · Weather2Travel',
    desc: 'Aplicação Python com login por cartão RFID e previsão meteorológica via API do IPMA. Interface CustomTkinter e base de dados de utilizadores.',
    year: '2024',
    links: [
      { label: 'Relatório', href: 'assets/documents/Projeto-Versão Final.pdf' },
      { label: 'GitHub', href: 'https://github.com/JPagear/Pogram-Aplicada-127140', ext: true }
    ]
  },
  {
    img: 'assets/images/Gemini_Generated_Image_28ar0l28ar0l28ar.png',
    cats: ['development', 'academic'],
    catLabel: 'Development',
    tags: ['Microserviços', 'Docker', 'Prometheus', 'Loki'],
    title: 'Sistemas Distribuídos · Microserviços',
    desc: 'Sistema de gestão de pedidos com API Gateway, REST, Prometheus, Grafana e Loki, orquestrado com Docker Compose.',
    year: '2025',
    links: [
      { label: 'Relatório', href: 'assets/documents/SD - Guia 8 - Projeto final.pdf' },
      { label: 'GitHub', href: 'https://github.com/Alpine5096/Projeto-Sistemas-Distribuidos-127878-127140', ext: true }
    ]
  },
  {
    img: 'assets/images/Gemini_Generated_Image_3mdbq3mdbq3mdbq3.png',
    cats: ['infrastructure', 'networking', 'academic'],
    catLabel: 'Infrastructure · Networking',
    tags: ['Asterisk', 'SIP', 'RADIUS'],
    title: 'VoIP · Asterisk, DNS & RADIUS',
    desc: 'Infraestrutura VoIP com PBX Asterisk, DNS via Bind9, autenticação FreeRADIUS e terminais SIP.',
    year: '2025',
    links: [{ label: 'Relatório', href: 'assets/documents/RELATÓRIO infraestrutura Voip.pdf' }]
  },
  {
    img: 'assets/images/Gemini_Generated_Image_ywoxlkywoxlkywox.png',
    cats: ['networking', 'academic'],
    catLabel: 'Networking',
    tags: ['Telemática', 'Redes'],
    title: 'Serviços Telemáticos',
    desc: 'Configuração e análise de serviços de comunicação em rede, protocolos de transporte e integração telemática em laboratório.',
    year: '2025',
    links: [{ label: 'Relatório', href: 'assets/documents/Relatório_ST.pdf' }]
  },
  {
    img: 'assets/images/Gemini_Generated_Image_m8wgm8m8wgm8m8wg.png',
    cats: ['networking', 'academic'],
    catLabel: 'Networking',
    tags: ['TCP/IP', 'DHCP', 'DNS', 'NAT'],
    title: 'Fundamentos de Rede · Universitária',
    desc: 'Rede universitária segmentada por departamentos com sub-redes IPv4, DHCP, DNS, NAT, FTP, servidor web/email, RIP e datacenter central.',
    year: '2024',
    links: [{ label: 'Relatório', href: 'assets/documents/Relatório_projetofinal_fundamentosderedes4.pdf' }]
  },
  {
    img: 'assets/images/Gemini_Generated_Image_sejtdysejtdysejt.png',
    cats: ['networking', 'academic'],
    catLabel: 'Networking',
    tags: ['VLANs', 'OSPF', 'GNS3'],
    title: 'Planeamento de Redes · BikeParts',
    desc: 'Rede multi-edifício com VLANs por departamento, OSPF, NAT, redes guest isoladas e arquitetura em camadas simulada em GNS3.',
    year: '2025',
    links: [{ label: 'Relatório', href: 'assets/documents/Relatório_projetofinal_PlaneamentoRedes_Andrelima_JoaoAlmeida-1.pdf' }]
  },
  {
    img: 'assets/images/Gemini_Generated_Image_m9e7dgm9e7dgm9e7.png',
    cats: ['infrastructure', 'networking', 'academic'],
    catLabel: 'Infrastructure · Networking',
    tags: ['Zabbix', 'Prometheus', 'SNMP'],
    title: 'Gestão de Redes · Zabbix vs Prometheus',
    desc: 'Análise comparativa entre Zabbix e Prometheus com SNMP, ICMP e APIs, e implementação prática com alertas e métricas.',
    year: '2025',
    links: [{ label: 'Relatório', href: 'assets/documents/Projeto de Gestão de Rede.pdf' }]
  }
];
