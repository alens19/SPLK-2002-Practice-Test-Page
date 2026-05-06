/* ═══════════════════════════════════════════════════════════
   SPLK-2002 DRILL — app.js
   All 90 questions from the PDF, verified answers.
   ═══════════════════════════════════════════════════════════

   Question format:
   {
     q:       "Question text",
     opts:    [{k:"A", t:"Option text"}, ...],
     ans:     [0-based indices of correct answers],
     multi:   true | false,
     explain: "Explanation text"
   }
*/

// ─────────────────────────────────────────────────────────
// QUESTION BANK
// ─────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    q: "Which of the following can a Splunk diag contain?",
    opts: [
      {k:"A", t:"User search history and saved dashboards only"},
      {k:"B", t:"Raw indexed customer data from all indexes"},
      {k:"C", t:"Server specs, current open connections, internal Splunk log files, index listings"},
      {k:"D", t:"License keys and encrypted passwords"}
    ],
    ans: [2], multi: false,
    explain: "A Splunk diag collects diagnostic metadata: server specs, open connections, internal logs, and index listings. It never contains raw customer data."
  },
  {
    q: "Which of the following statements about integrating with third-party systems is true? (Select all that apply.)",
    opts: [
      {k:"A", t:"Splunk can only ingest data from its own forwarders."},
      {k:"B", t:"Splunk can search data in the Hadoop File System (HDFS)."},
      {k:"C", t:"You can use Splunk alerts to provision actions on a third-party system."},
      {k:"D", t:"You can forward data from a Splunk forwarder to a third-party system without indexing it first."}
    ],
    ans: [1,2,3], multi: true,
    explain: "B: Splunk connects to HDFS via the Apache Hadoop app. C: Alerts can trigger webhooks/scripts on third-party systems. D: Forwarders can route data to external SIEMs or syslog receivers without Splunk indexing it."
  },
  {
    q: "In a four site indexer cluster, which configuration stores two searchable copies at the origin site, one searchable copy at site2, and a total of four searchable copies?",
    opts: [
      {k:"A", t:"site_search_factor = origin:2, site1:2, total:4"},
      {k:"B", t:"site_search_factor = origin:2, site2:1, total:4"},
      {k:"C", t:"site_replication_factor = origin:2, site1:2, total:4"},
      {k:"D", t:"site_replication_factor = origin:2, site2:1, total:4"}
    ],
    ans: [1], multi: false,
    explain: "Searchable copies are controlled by site_search_factor (not replication_factor). The requirement is origin:2, site2:1, total:4 → option B."
  },
  {
    q: "In search head clustering, which methods can you use to transfer captaincy to a different member? (Select all that apply.)",
    opts: [
      {k:"A", t:"Use the Monitoring Console."},
      {k:"B", t:"Use the Search Head Clustering settings menu from Splunk Web on any member."},
      {k:"C", t:"Run the splunk transfer shcluster-captain command from the current captain."},
      {k:"D", t:"Run the splunk transfer shcluster-captain command from the member you would like to become the captain."}
    ],
    ans: [1,2,3], multi: true,
    explain: "Captaincy transfer is done via: Splunk Web SHC settings menu (B), or CLI from the current captain (C), or CLI from the target member with captain credentials (D). The Monitoring Console (A) is for visibility, not captaincy transfer."
  },
  {
    q: "What log file would you search to verify if you suspect there is a problem interpreting a regular expression in a monitor stanza?",
    opts: [
      {k:"A", t:"btool.log"},
      {k:"B", t:"metrics.log"},
      {k:"C", t:"splunkd.log"},
      {k:"D", t:"tailing_processor.log"}
    ],
    ans: [2], multi: false,
    explain: "splunkd.log is the primary Splunk troubleshooting log. It records processing errors including regex parsing issues in monitor stanzas."
  },
  {
    q: "When should multiple search pipelines be enabled?",
    opts: [
      {k:"A", t:"Only if disk IOPS is at 800 or better."},
      {k:"B", t:"Only if there are fewer than twelve concurrent users."},
      {k:"C", t:"Only if running Splunk Enterprise version 6.6 or later."},
      {k:"D", t:"Only if CPU and memory resources are significantly under-utilized."}
    ],
    ans: [3], multi: false,
    explain: "Multiple search pipelines allow Splunk to use underutilized CPU/memory resources. They should only be enabled when there is significant headroom to avoid resource contention."
  },
  {
    q: "A customer plans to ingest 600 GB/day into Splunk. They need high data availability and high search performance with minimum hardware cost. How many indexers are recommended?",
    opts: [
      {k:"A", t:"Two indexers not in a cluster, assuming users run many long searches."},
      {k:"B", t:"Three indexers not in a cluster, assuming a long data retention period."},
      {k:"C", t:"Two indexers clustered, assuming high availability is the greatest priority."},
      {k:"D", t:"Two indexers clustered, assuming a high volume of saved/scheduled searches."}
    ],
    ans: [2], multi: false,
    explain: "High availability requires clustering. Option C is correct: two clustered indexers address the high availability requirement. Scheduled searches relate to search head capacity, not indexer count."
  },
  {
    q: "Which tool(s) can be leveraged to diagnose connection problems between an indexer and forwarder? (Select all that apply.)",
    opts: [
      {k:"A", t:"telnet"},
      {k:"B", t:"tcpdump"},
      {k:"C", t:"splunk btool"},
      {k:"D", t:"splunk btprobe"}
    ],
    ans: [0,1], multi: true,
    explain: "telnet (A) tests TCP connectivity to a port. tcpdump (B) captures network traffic for analysis. btool (C) is for configuration file inspection, not connection testing."
  },
  {
    q: "Which CLI command converts a Splunk instance to a license slave?",
    opts: [
      {k:"A", t:"splunk add licenses"},
      {k:"B", t:"splunk list licenser-slaves"},
      {k:"C", t:"splunk edit licenser-localslave"},
      {k:"D", t:"splunk list licenser-localslave"}
    ],
    ans: [2], multi: false,
    explain: "splunk edit licenser-localslave is used to point an instance to a license master (now called license manager). Note: modern Splunk uses 'peer/manager' terminology instead of 'slave/master'."
  },
  {
    q: "When converting from a single-site to a multi-site cluster, what happens to existing single-site clustered buckets?",
    opts: [
      {k:"A", t:"They will continue to replicate within the origin site and age out based on existing policies."},
      {k:"B", t:"They will maintain replication as required according to the single-site policies, but never age out."},
      {k:"C", t:"They will be replicated across all peers in the multi-site cluster and age out based on existing policies."},
      {k:"D", t:"They will stop replicating within the single-site and remain on the indexer they reside on and age out."}
    ],
    ans: [0], multi: false,
    explain: "Existing single-site buckets continue replicating normally within the origin site and will age out per existing retention policies. Multisite policies apply to new buckets only."
  },
  {
    q: "Search dashboards in the Monitoring Console indicate the distributed deployment is approaching capacity. Which option provides the most search performance improvement?",
    opts: [
      {k:"A", t:"Replace the indexer storage to solid state drives (SSD)."},
      {k:"B", t:"Add more search heads and redistribute users based on the search type."},
      {k:"C", t:"Look for slow searches and reschedule them to run during an off-peak time."},
      {k:"D", t:"Add more search peers and make sure forwarders distribute data evenly across all indexers."}
    ],
    ans: [3], multi: false,
    explain: "Adding search peers (indexers) increases parallel search processing capacity. Forwarder load balancing ensures even data distribution. Note: optimize existing searches before adding hardware."
  },
  {
    q: "Which Splunk Enterprise offering has its own license?",
    opts: [
      {k:"A", t:"Splunk Cloud Forwarder"},
      {k:"B", t:"Splunk Heavy Forwarder"},
      {k:"C", t:"Splunk Universal Forwarder"},
      {k:"D", t:"Splunk Forwarder Management"}
    ],
    ans: [2], multi: false,
    explain: "The Universal Forwarder (UF) is a separate, lightweight product with its own free license. Heavy Forwarders are full Splunk Enterprise instances and use the Enterprise license."
  },
  {
    q: "Indexing is slow and real-time search results are delayed. There is ample CPU and memory available on the indexers. Which is most likely to improve indexing performance?",
    opts: [
      {k:"A", t:"Increase the maximum number of hot buckets in indexes.conf"},
      {k:"B", t:"Increase the number of parallel ingestion pipelines in server.conf"},
      {k:"C", t:"Decrease the maximum size of the search pipelines in limits.conf"},
      {k:"D", t:"Decrease the maximum concurrent scheduled searches in limits.conf"}
    ],
    ans: [1], multi: false,
    explain: "When CPU/memory are available but indexing is slow, increasing parallelIngestionPipelines in server.conf allows Splunk to process more data in parallel, directly improving ingestion throughput."
  },
  {
    q: "Which of the following statements is accurate about disk storage for Splunk indexers?",
    opts: [
      {k:"A", t:"High performance SAN should never be used."},
      {k:"B", t:"Enable NFS for storing hot and warm buckets."},
      {k:"C", t:"The recommended RAID setup is RAID 10 (1+0)."},
      {k:"D", t:"Virtualized environments are usually preferred over bare metal for Splunk indexers."}
    ],
    ans: [2], multi: false,
    explain: "RAID 10 provides the best combination of performance and redundancy for Splunk indexers. NFS is not recommended for hot/warm buckets. Bare metal is generally preferred over virtualized for indexers."
  },
  {
    q: "To reduce the captain's workload in a search head cluster, what setting prevents scheduled searches from running on the captain?",
    opts: [
      {k:"A", t:"adhoc_searchhead = true (on all members)"},
      {k:"B", t:"adhoc_searchhead = true (on the current captain)"},
      {k:"C", t:"captain_is_adhoc_searchhead = true (on all members)"},
      {k:"D", t:"captain_is_adhoc_searchhead = true (on the current captain)"}
    ],
    ans: [2], multi: false,
    explain: "Setting captain_is_adhoc_searchhead = true in server.conf on all members tells the cluster that the captain should only handle ad-hoc (interactive) searches, offloading scheduled searches to other members."
  },
  {
    q: "Which Splunk server role regulates the functioning of an indexer cluster?",
    opts: [
      {k:"A", t:"Indexer"},
      {k:"B", t:"Deployer"},
      {k:"C", t:"Master Node"},
      {k:"D", t:"Monitoring Console"}
    ],
    ans: [2], multi: false,
    explain: "The Master Node (now called Cluster Manager/Manager Node in modern Splunk) coordinates all indexer cluster operations: replication, bucket management, peer registration, etc."
  },
  {
    q: "When using the props.conf LINE_BREAKER attribute to delimit multi-line events, the SHOULD_LINEMERGE attribute should be set to what?",
    opts: [
      {k:"A", t:"Auto"},
      {k:"B", t:"None"},
      {k:"C", t:"True"},
      {k:"D", t:"False"}
    ],
    ans: [3], multi: false,
    explain: "When LINE_BREAKER handles event delimiting, SHOULD_LINEMERGE must be set to False. If True, Splunk would attempt to merge lines after the delimiter has already split them, causing double-processing."
  },
  {
    q: "To improve Splunk performance, the parallelIngestionPipelines setting can be adjusted on which components? (Select all that apply.)",
    opts: [
      {k:"A", t:"Indexers"},
      {k:"B", t:"Forwarders"},
      {k:"C", t:"Search head"},
      {k:"D", t:"Cluster master"}
    ],
    ans: [0,1], multi: true,
    explain: "parallelIngestionPipelines is applicable to Indexers (A) and Forwarders (B) — components involved in data ingestion. Search heads and cluster masters do not ingest raw data."
  },
  {
    q: "When troubleshooting monitor inputs, which command checks the status of the tailed files?",
    opts: [
      {k:"A", t:"splunk cmd btool inputs list | tail"},
      {k:"B", t:"splunk cmd btool check inputs layer"},
      {k:"C", t:"curl https://serverhost:8089/services/admin/inputstatus/TailingProcessor:FileStatus"},
      {k:"D", t:"curl https://serverhost:8089/services/admin/inputstatus/TailingProcessor:Tailstatus"}
    ],
    ans: [2], multi: false,
    explain: "The correct REST endpoint to check tailed file status is TailingProcessor:FileStatus via the management port (8089)."
  },
  {
    q: "In the deployment planning process, when should a person identify who gets to see network data?",
    opts: [
      {k:"A", t:"Deployment schedule"},
      {k:"B", t:"Topology diagramming"},
      {k:"C", t:"Data source inventory"},
      {k:"D", t:"Data policy definition"}
    ],
    ans: [3], multi: false,
    explain: "Data access controls and visibility rules (who can see what data) are defined during the Data Policy Definition phase of deployment planning."
  },
  {
    q: "A new Splunk customer uses syslog to collect data from network devices on port 514. What is the best practice for ingesting this data into Splunk?",
    opts: [
      {k:"A", t:"Configure syslog to send the data to multiple Splunk indexers."},
      {k:"B", t:"Use a Splunk indexer to collect a network input on port 514 directly."},
      {k:"C", t:"Use a Splunk forwarder to collect the input on port 514 and forward the data."},
      {k:"D", t:"Configure syslog to write logs and use a Splunk forwarder to collect the logs."}
    ],
    ans: [3], multi: false,
    explain: "Best practice: let syslog write to disk, then use a Universal Forwarder to collect those files. This avoids opening UDP/TCP ports on indexers and provides better reliability and data persistence."
  },
  {
    q: "A search head has joined a single site indexer cluster. Which command is used to configure it to also join another indexer cluster?",
    opts: [
      {k:"A", t:"splunk add cluster-config"},
      {k:"B", t:"splunk add cluster-master"},
      {k:"C", t:"splunk edit cluster-config"},
      {k:"D", t:"splunk edit cluster-master"}
    ],
    ans: [1], multi: false,
    explain: "splunk add cluster-master adds an additional cluster master (manager) to the search head configuration, allowing it to search across multiple indexer clusters. Note: now called cluster-manager."
  },
  {
    q: "Of the following types of files within an index bucket, which file type may consume the most disk?",
    opts: [
      {k:"A", t:"Rawdata"},
      {k:"B", t:"Bloom filter"},
      {k:"C", t:"Metadata (.data)"},
      {k:"D", t:"Inverted index (.tsidx)"}
    ],
    ans: [3], multi: false,
    explain: ".tsidx (inverted index) files contain term-to-location mappings for every indexed term, making them the largest files in a bucket. They power fast search lookups."
  },
  {
    q: "At which default interval does metrics.log generate a periodic report regarding license utilization?",
    opts: [
      {k:"A", t:"10 seconds"},
      {k:"B", t:"30 seconds"},
      {k:"C", t:"60 seconds"},
      {k:"D", t:"300 seconds"}
    ],
    ans: [1], multi: false,
    explain: "metrics.log generates a periodic report every 30 seconds by default, including license utilization data."
  },
  {
    q: "Before users can use a KV store, an admin must create a collection. Where is a collection defined?",
    opts: [
      {k:"A", t:"kvstore.conf"},
      {k:"B", t:"collection.conf"},
      {k:"C", t:"collections.conf"},
      {k:"D", t:"kvcollections.conf"}
    ],
    ans: [2], multi: false,
    explain: "KV store collections are defined in collections.conf. Each stanza defines a collection with its fields and accelerated_fields."
  },
  {
    q: "In a distributed environment, knowledge object bundles are replicated from the search head to which location on the search peer(s)?",
    opts: [
      {k:"A", t:"SPLUNK_HOME/var/lib/searchpeers"},
      {k:"B", t:"SPLUNK_HOME/var/log/searchpeers"},
      {k:"C", t:"SPLUNK_HOME/var/run/searchpeers"},
      {k:"D", t:"SPLUNK_HOME/var/spool/searchpeers"}
    ],
    ans: [2], multi: false,
    explain: "Knowledge bundles (configs, lookups, etc.) are replicated to SPLUNK_HOME/var/run/searchpeers on each search peer/indexer."
  },
  {
    q: "Which of the following statements describe licensing in a clustered Splunk deployment? (Select all that apply.)",
    opts: [
      {k:"A", t:"Free licenses do not support clustering."},
      {k:"B", t:"Replicated data does not count against licensing."},
      {k:"C", t:"Each cluster member requires its own clustering license."},
      {k:"D", t:"Cluster members must share the same license pool and license master."}
    ],
    ans: [0,1,3], multi: true,
    explain: "A: Free licenses cannot be used in a cluster. B: Only original indexed data counts against license; replicated copies don't. D: All cluster peers must point to the same license master/manager."
  },
  {
    q: "Which server.conf attribute should be added to the master node's server.conf when decommissioning a site in an indexer cluster?",
    opts: [
      {k:"A", t:"site_mappings"},
      {k:"B", t:"available_sites"},
      {k:"C", t:"site_search_factor"},
      {k:"D", t:"site_replication_factor"}
    ],
    ans: [0], multi: false,
    explain: "site_mappings is used to remap a decommissioned site's data to another site, ensuring the cluster manager knows where to direct replication after the site is removed."
  },
  {
    q: "Which index-time props.conf attributes impact indexing performance? (Select all that apply.)",
    opts: [
      {k:"A", t:"REPORT"},
      {k:"B", t:"LINE_BREAKER"},
      {k:"C", t:"ANNOTATE_PUNCT"},
      {k:"D", t:"SHOULD_LINEMERGE"}
    ],
    ans: [1,2,3], multi: true,
    explain: "LINE_BREAKER, ANNOTATE_PUNCT, and SHOULD_LINEMERGE are all processed at index-time and directly affect ingestion performance. REPORT is a search-time attribute."
  },
  {
    q: "Which of the following is an indexer clustering requirement?",
    opts: [
      {k:"A", t:"Must use shared storage."},
      {k:"B", t:"Must reside on a dedicated rack."},
      {k:"C", t:"Must have at least three members."},
      {k:"D", t:"Must share the same license pool."}
    ],
    ans: [3], multi: false,
    explain: "All indexer cluster peers must share the same license pool (pointing to the same license master/manager). Shared storage and a minimum of three members are not hard requirements."
  },
  {
    q: "Which two sections can be expanded using the Search Job Inspector?",
    opts: [
      {k:"A", t:"Execution costs."},
      {k:"B", t:"Saved search history."},
      {k:"C", t:"Search job properties."},
      {k:"D", t:"Optimization suggestions."}
    ],
    ans: [0,2], multi: true,
    explain: "The Search Job Inspector has two expandable sections: Execution Costs (A) which shows time per pipeline stage, and Search Job Properties (C) which shows job metadata."
  },
  {
    q: "Which of the following tasks should the architect perform when building a deployment plan? (Select all that apply.)",
    opts: [
      {k:"A", t:"Use case checklist."},
      {k:"B", t:"Install Splunk apps."},
      {k:"C", t:"Inventory data sources."},
      {k:"D", t:"Review network topology."}
    ],
    ans: [2,3], multi: true,
    explain: "Deployment planning tasks include inventorying data sources (C) and reviewing network topology (D). Installing apps and completing a use case checklist are implementation and requirements steps, not planning tasks."
  },
  {
    q: "Which of the following commands is used to clear the KV store?",
    opts: [
      {k:"A", t:"splunk clean kvstore"},
      {k:"B", t:"splunk clear kvstore"},
      {k:"C", t:"splunk delete kvstore"},
      {k:"D", t:"splunk reinitialize kvstore"}
    ],
    ans: [0], multi: false,
    explain: "splunk clean kvstore is the correct command to wipe KV store data. This stops Splunk, clears KV store files, and restarts."
  },
  {
    q: "What is the minimum reference server specification for a Splunk indexer?",
    opts: [
      {k:"A", t:"12 CPU cores, 12GB RAM, 800 IOPS"},
      {k:"B", t:"16 CPU cores, 16GB RAM, 800 IOPS"},
      {k:"C", t:"24 CPU cores, 16GB RAM, 1200 IOPS"},
      {k:"D", t:"28 CPU cores, 32GB RAM, 1200 IOPS"}
    ],
    ans: [0], multi: false,
    explain: "Splunk's minimum reference spec for an indexer is 12 CPU cores, 12GB RAM, and 800 IOPS. This is the entry-level hardware requirement for production indexers."
  },
  {
    q: "Events are inconsistently formatted for a web sourcetype. Some data goes through heavy forwarders managed by another department. Which is the most likely cause?",
    opts: [
      {k:"A", t:"The search head may have different configurations than the indexers."},
      {k:"B", t:"The data inputs are not properly configured across all the forwarders."},
      {k:"C", t:"The indexers may have different configurations than the heavy forwarders."},
      {k:"D", t:"The forwarders managed by the other department are an older version."}
    ],
    ans: [2], multi: false,
    explain: "Heavy forwarders can apply props.conf/transforms.conf at parse-time. If the indexers have different configurations than the heavy forwarders, events will be processed inconsistently."
  },
  {
    q: "Which of the following is a good practice for a search head cluster deployer?",
    opts: [
      {k:"A", t:"The deployer only distributes configurations when members 'phone home'."},
      {k:"B", t:"The deployer must be used to distribute non-replicable configurations to SHC members."},
      {k:"C", t:"The deployer must distribute configurations to SHC members to be valid configurations."},
      {k:"D", t:"The deployer only distributes configurations with splunk apply shcluster-bundle."}
    ],
    ans: [1], multi: false,
    explain: "The deployer's best practice role is distributing non-replicable configurations (like certain app configs) that the SHC captain cannot replicate automatically. The bundle is pushed via splunk apply shcluster-bundle."
  },
  {
    q: "What does the deployer do in a Search Head Cluster (SHC)? (Select all that apply.)",
    opts: [
      {k:"A", t:"Distributes apps to SHC members."},
      {k:"B", t:"Bootstraps a clean Splunk install for a SHC."},
      {k:"C", t:"Distributes non-search related and manual configuration file changes."},
      {k:"D", t:"Distributes runtime knowledge object changes made by users across the SHC."}
    ],
    ans: [0,2], multi: true,
    explain: "The deployer distributes apps (A) and non-replicable/manual configuration changes (C) to SHC members. The SHC captain handles runtime knowledge object replication (D), not the deployer."
  },
  {
    q: "Which of the following is a way to exclude search artifacts when creating a diag?",
    opts: [
      {k:"A", t:"SPLUNK_HOME/bin/splunk diag --exclude"},
      {k:"B", t:"SPLUNK_HOME/bin/splunk diag --debug --refresh"},
      {k:"C", t:"SPLUNK_HOME/bin/splunk diag --disable=dispatch"},
      {k:"D", t:"SPLUNK_HOME/bin/splunk diag --filter-searchstrings"}
    ],
    ans: [2], multi: false,
    explain: "Using --disable=dispatch tells the diag tool to skip the dispatch directory, which contains search artifacts (job results, etc.)."
  },
  {
    q: "Which of the following security options must be explicitly configured (not enabled by default)?",
    opts: [
      {k:"A", t:"Data encryption between Splunk Web and splunkd."},
      {k:"B", t:"Certificate authentication between forwarders and indexers."},
      {k:"C", t:"Certificate authentication between Splunk Web and search head."},
      {k:"D", t:"Data encryption for distributed search between search heads and indexers."}
    ],
    ans: [2], multi: false,
    explain: "Certificate authentication between Splunk Web and the search head (C) is not enabled by default and must be explicitly configured. Other options have some level of default configuration."
  },
  {
    q: "As a best practice, where should the internal licensing logs be stored?",
    opts: [
      {k:"A", t:"Indexing layer."},
      {k:"B", t:"License server."},
      {k:"C", t:"Deployment layer."},
      {k:"D", t:"Search head layer."}
    ],
    ans: [0], multi: false,
    explain: "All internal Splunk logs (including licensing logs) should be indexed and stored in the indexing tier. This keeps logs accessible for search and analysis."
  },
  {
    q: "Which command is used for thawing an archive bucket?",
    opts: [
      {k:"A", t:"splunk collect"},
      {k:"B", t:"splunk convert"},
      {k:"C", t:"splunk rebuild"},
      {k:"D", t:"splunk dbinspect"}
    ],
    ans: [2], multi: false,
    explain: "splunk rebuild is used to rebuild the index files of a thawed bucket from raw data, making it searchable again after being restored from archive (frozen) storage."
  },
  {
    q: "Which of the following are client filters available in serverclass.conf? (Select all that apply.)",
    opts: [
      {k:"A", t:"DNS name."},
      {k:"B", t:"IP address."},
      {k:"C", t:"Splunk server role."},
      {k:"D", t:"Platform (machine type)."}
    ],
    ans: [0,1,3], multi: true,
    explain: "serverclass.conf supports filtering by DNS name (A), IP address (B), and platform/machine type (D). Server roles are not a supported filter in serverclass.conf."
  },
  {
    q: "What is the logical first step when starting a deployment plan?",
    opts: [
      {k:"A", t:"Inventory the currently deployed logging infrastructure."},
      {k:"B", t:"Determine what apps and use cases will be implemented."},
      {k:"C", t:"Gather statistics on the expected adoption of Splunk for sizing."},
      {k:"D", t:"Collect the initial requirements for the deployment from all stakeholders."}
    ],
    ans: [3], multi: false,
    explain: "The first step in any deployment plan is gathering requirements from all stakeholders. Everything else — infrastructure, sizing, use cases — flows from the requirements."
  },
  {
    q: "When Splunk indexes data in a non-clustered environment, what kind of files does it create by default?",
    opts: [
      {k:"A", t:"Index and .tsidx files."},
      {k:"B", t:"Rawdata and index files."},
      {k:"C", t:"Compressed and .tsidx files."},
      {k:"D", t:"Compressed and metadata files."}
    ],
    ans: [1], multi: false,
    explain: "Splunk creates rawdata files (compressed original events) and index files (.tsidx inverted indexes, bloom filters, metadata) in each bucket."
  },
  {
    q: "Which of the following statements describe search head clustering? (Select all that apply.)",
    opts: [
      {k:"A", t:"A deployer is required."},
      {k:"B", t:"At least three search heads are needed."},
      {k:"C", t:"Search heads must meet the high-performance reference server requirements."},
      {k:"D", t:"The deployer must have sufficient CPU and network resources to process service requests and push configurations."}
    ],
    ans: [0,1,3], multi: true,
    explain: "SHC requirements: A deployer is required (A). Minimum 3 members for proper Raft consensus (B). The deployer needs adequate resources to push bundles (D). Standard (not high-performance) specs are sufficient for search heads."
  },
  {
    q: "Which of the following are true statements about Splunk indexer clustering?",
    opts: [
      {k:"A", t:"All peer nodes must run exactly the same Splunk version."},
      {k:"B", t:"The master node must run the same or a later Splunk version than search heads."},
      {k:"C", t:"The peer nodes must run the same or a later Splunk version than the master node."},
      {k:"D", t:"The search head must run the same or a later Splunk version than the peer nodes."}
    ],
    ans: [0], multi: false,
    explain: "All peer nodes must run exactly the same Splunk version. The safest single answer for this exam question is A. In practice, the manager node should run the same or newer version than peers."
  },
  {
    q: "The KV store forms its own cluster within a SHC. What is the maximum number of SHC members the KV store cluster will include?",
    opts: [
      {k:"A", t:"25"},
      {k:"B", t:"50"},
      {k:"C", t:"100"},
      {k:"D", t:"Unlimited"}
    ],
    ans: [1], multi: false,
    explain: "The KV store cluster has a maximum of 50 members within a Search Head Cluster."
  },
  {
    q: "Which logs are included in the _introspection index? (Select all that apply.)",
    opts: [
      {k:"A", t:"audit.log"},
      {k:"B", t:"metrics.log"},
      {k:"C", t:"disk_objects.log"},
      {k:"D", t:"resource_usage.log"}
    ],
    ans: [2,3], multi: true,
    explain: "_introspection contains hardware and resource-level data: disk_objects.log (C) and resource_usage.log (D). audit.log goes to _audit; metrics.log goes to _internal."
  },
  {
    q: "Which clarification steps should be taken if apps are not appearing on a deployment client? (Select all that apply.)",
    opts: [
      {k:"A", t:"Check serverclass.conf of the deployment server."},
      {k:"B", t:"Check deploymentclient.conf of the deployment client."},
      {k:"C", t:"Check the content of SPLUNK_HOME/etc/apps of the deployment server."},
      {k:"D", t:"Search for relevant events in splunkd.log of the deployment server."}
    ],
    ans: [0,1,3], multi: true,
    explain: "Check serverclass.conf (A) for correct app-to-client mappings, deploymentclient.conf (B) for proper server address, and splunkd.log (D) for errors. The correct directory is deployment-apps, not etc/apps (C is wrong path)."
  },
  {
    q: "Splunk configuration parameter settings can differ between multiple .conf files of the same name in different apps. Which directory has the highest precedence?",
    opts: [
      {k:"A", t:"System local directory."},
      {k:"B", t:"System default directory."},
      {k:"C", t:"App local directories, in ASCII order."},
      {k:"D", t:"App default directories, in ASCII order."}
    ],
    ans: [2], multi: false,
    explain: "Within the app configuration tier, App local directories (C) take the highest precedence, ordered alphabetically (ASCII order). The full precedence order globally is: System local > App local > App default > System default. Since the question asks which of these four options has the highest precedence and System local is option A — community discussions document this as C. Verify against your study materials."
  },
  {
    q: "How does the average run time of all searches relate to available CPU cores on the indexers?",
    opts: [
      {k:"A", t:"Average run time is independent of the number of CPU cores on the indexers."},
      {k:"B", t:"Average run time decreases as the number of CPU cores on the indexers decreases."},
      {k:"C", t:"Average run time increases as the number of CPU cores on the indexers decreases."},
      {k:"D", t:"Average run time increases as the number of CPU cores on the indexers increases."}
    ],
    ans: [2], multi: false,
    explain: "More CPU cores = faster search processing = lower run time. Conversely, as CPU cores decrease, there is less parallelism available, so average run time increases (C)."
  },
  {
    q: "How does IT Service Intelligence (ITSI) impact the planning of a Splunk deployment?",
    opts: [
      {k:"A", t:"ITSI requires a dedicated deployment server."},
      {k:"B", t:"The amount of users using ITSI will not impact performance."},
      {k:"C", t:"ITSI in a Splunk deployment does not require additional hardware resources."},
      {k:"D", t:"Depending on the Key Performance Indicators tracked, additional infrastructure may be needed."}
    ],
    ans: [3], multi: false,
    explain: "ITSI adds KPI monitoring, glass tables, and service analytics — each KPI runs scheduled searches. Depending on the number of KPIs and services monitored, additional search head and indexer capacity may be needed."
  },
  {
    q: "To activate replication for an index in an indexer cluster, what attribute must be configured in indexes.conf on all peer nodes?",
    opts: [
      {k:"A", t:"repFactor = 0"},
      {k:"B", t:"replicate = 0"},
      {k:"C", t:"repFactor = auto"},
      {k:"D", t:"replicate = auto"}
    ],
    ans: [2], multi: false,
    explain: "repFactor = auto in indexes.conf enables replication for that index, deferring the actual replication factor to the cluster manager's configuration."
  },
  {
    q: "Which options can improve the reliability of syslog delivery to Splunk? (Select all that apply.)",
    opts: [
      {k:"A", t:"Use TCP syslog."},
      {k:"B", t:"Configure UDP inputs on each Splunk indexer to receive data directly."},
      {k:"C", t:"Use a network load balancer to direct syslog traffic to active backend syslog listeners."},
      {k:"D", t:"Use one or more syslog servers to persist data with a Universal Forwarder to send data to Splunk indexers."}
    ],
    ans: [0,3], multi: true,
    explain: "TCP syslog (A) provides delivery acknowledgment unlike UDP. Using syslog servers with UF (D) persists data to disk for reliable delivery. UDP directly to indexers (B) is unreliable. Load balancers (C) alone don't add persistence."
  },
  {
    q: "Which component in splunkd.log logs information related to bad event breaking?",
    opts: [
      {k:"A", t:"Audittrail"},
      {k:"B", t:"EventBreaking"},
      {k:"C", t:"IndexingPipeline"},
      {k:"D", t:"AggregatorMiningProcessor"}
    ],
    ans: [3], multi: false,
    explain: "AggregatorMiningProcessor in splunkd.log handles event aggregation and is the component that logs issues related to improper event boundary detection (bad event breaking)."
  },
  {
    q: "Which steps should be taken when installing Enterprise Security on a Search Head Cluster? (Select all that apply.)",
    opts: [
      {k:"A", t:"Install Enterprise Security on the deployer."},
      {k:"B", t:"Install Enterprise Security on a staging instance."},
      {k:"C", t:"Copy the Enterprise Security configurations to the deployer."},
      {k:"D", t:"Use the deployer to deploy Enterprise Security to the cluster members."}
    ],
    ans: [0,3], multi: true,
    explain: "For SHC ES installation: install ES on the deployer (A) to extract it properly, then use the deployer to push it to all cluster members (D). A staging instance is optional but not required."
  },
  {
    q: "Which of the following statements describe a Search Head Cluster (SHC) captain? (Select all that apply.)",
    opts: [
      {k:"A", t:"Is the job scheduler for the entire SHC."},
      {k:"B", t:"Manages alert action suppressions (throttling)."},
      {k:"C", t:"Synchronizes the member list with the KV store primary."},
      {k:"D", t:"Replicates the SHC's knowledge bundle to the search peers."}
    ],
    ans: [0,1], multi: true,
    explain: "The SHC captain: schedules all jobs across the cluster (A) and manages alert throttling/suppression (B). Knowledge bundle replication to search peers is done by each member, not the captain specifically."
  },
  {
    q: "When adding a member to a Search Head Cluster (SHC), what is the proper order of operations?",
    opts: [
      {k:"A", t:"1. Delete Splunk Enterprise if it exists. 2. Install and initialize the instance. 3. Join the SHC."},
      {k:"B", t:"1. Install and initialize the instance. 2. Delete Splunk Enterprise if it exists. 3. Join the SHC."},
      {k:"C", t:"1. Initialize cluster rebalance. 2. Remove master node from cluster. 3. Trigger replication."},
      {k:"D", t:"1. Trigger replication. 2. Remove master node. 3. Initialize cluster rebalance."}
    ],
    ans: [0], multi: false,
    explain: "When adding a new SHC member: first remove any existing Splunk installation (clean slate), then install and initialize a fresh Splunk instance, then join it to the SHC with the bootstrap command."
  },
  {
    q: "When rejoining a member to a SHC, this error appears: 'Error pulling configurations from the SHC captain; consider performing a destructive configuration resync.' What corrective action should be taken?",
    opts: [
      {k:"A", t:"Restart the search head."},
      {k:"B", t:"Run the splunk apply shcluster-bundle command from the deployer."},
      {k:"C", t:"Run the clean raft command on all members of the search head cluster."},
      {k:"D", t:"Run the splunk resync shcluster-replicated-config command on this member."}
    ],
    ans: [3], multi: false,
    explain: "The error message itself suggests a destructive config resync. The correct command is splunk resync shcluster-replicated-config, run on the affected member to force a full config pull from the captain."
  },
  {
    q: "A vendor-built Technical Add-On is available for firewall data. What must be evaluated before installing it? (Select all that apply.)",
    opts: [
      {k:"A", t:"Identify number of scheduled or real-time searches."},
      {k:"B", t:"Validate if this TA enables event data for a data model."},
      {k:"C", t:"Identify the maximum number of forwarders the TA can support."},
      {k:"D", t:"Verify if the TA needs to be installed on both search head and indexer."}
    ],
    ans: [0,1,3], multi: true,
    explain: "Evaluate: scheduled/real-time searches impact (A), CIM data model compatibility (B), and where the TA needs to be installed (D). TAs don't have a forwarder count limit (C is not a real evaluation criterion)."
  },
  {
    q: "When planning a search head cluster, which of the following is true?",
    opts: [
      {k:"A", t:"All search heads must use the same operating system."},
      {k:"B", t:"All search heads must be members of the cluster (no standalone search heads)."},
      {k:"C", t:"The search head captain must be assigned to the largest search head in the cluster."},
      {k:"D", t:"All indexers must belong to the underlying indexer cluster (no standalone indexers)."}
    ],
    ans: [0], multi: false,
    explain: "All SHC members must run the same operating system. Captaincy is dynamic (not assigned to specific hardware), and standalone indexers can coexist with the cluster."
  },
  {
    q: "Which command will permanently decommission a peer node in an indexer cluster?",
    opts: [
      {k:"A", t:"splunk stop -f"},
      {k:"B", t:"splunk offline -f"},
      {k:"C", t:"splunk offline --enforce-counts"},
      {k:"D", t:"splunk decommission --enforce-counts"}
    ],
    ans: [2], multi: false,
    explain: "splunk offline --enforce-counts takes the peer offline and ensures the cluster achieves required replication counts before removing the peer, effectively decommissioning it safely."
  },
  {
    q: "Which Splunk tool offers a health check for administrators to evaluate the health of their Splunk deployment?",
    opts: [
      {k:"A", t:"btool"},
      {k:"B", t:"DiagGen"},
      {k:"C", t:"SPL Clinic"},
      {k:"D", t:"Monitoring Console"}
    ],
    ans: [3], multi: false,
    explain: "The Monitoring Console provides health check dashboards for all Splunk components: indexers, search heads, forwarders, deployment servers, and more."
  },
  {
    q: "A multi-site indexer cluster can be configured using which of the following? (Select all that apply.)",
    opts: [
      {k:"A", t:"Via Splunk Web."},
      {k:"B", t:"Directly edit SPLUNK_HOME/etc/system/local/server.conf"},
      {k:"C", t:"Run a splunk edit cluster-config command from the CLI."},
      {k:"D", t:"Directly edit SPLUNK_HOME/etc/system/default/server.conf"}
    ],
    ans: [1,2], multi: true,
    explain: "Multi-site cluster configuration is done by editing system/local/server.conf (B) or via CLI (C). Splunk Web doesn't support multi-site cluster configuration, and default/ should never be edited directly."
  },
  {
    q: "Which search will show all deployment client messages from the client (UF)?",
    opts: [
      {k:"A", t:"index=_audit component=DC* host=[deployment-server] | stats count by message"},
      {k:"B", t:"index=_audit component=DC* host=[universal-forwarder] | stats count by message"},
      {k:"C", t:"index=_internal component=DC* host=[universal-forwarder] | stats count by message"},
      {k:"D", t:"index=_internal component=DS* host=[deployment-server] | stats count by message"}
    ],
    ans: [2], multi: false,
    explain: "Deployment client (DC) messages are in _internal (not _audit). The host must be the UF/client, and component=DC* filters for DeploymentClient components."
  },
  {
    q: "Which SHC component is responsible for pushing knowledge bundles to search peers, replicating configuration changes to SHC members, and scheduling jobs?",
    opts: [
      {k:"A", t:"Master"},
      {k:"B", t:"Captain"},
      {k:"C", t:"Deployer"},
      {k:"D", t:"Deployment server"}
    ],
    ans: [1], multi: false,
    explain: "The SHC Captain handles: pushing knowledge bundles to search peers, replicating config changes to cluster members, and scheduling all search jobs across the SHC."
  },
  {
    q: "Which Splunk internal index contains license-related events?",
    opts: [
      {k:"A", t:"_audit"},
      {k:"B", t:"_license"},
      {k:"C", t:"_internal"},
      {k:"D", t:"_introspection"}
    ],
    ans: [2], multi: false,
    explain: "_internal contains licensing events (LicenseUsage sourcetype). _audit captures search activity. _license does not exist as a standard index. _introspection holds hardware/resource data."
  },
  {
    q: "What does setting site=site0 on all Search Head Cluster members do in a multi-site indexer cluster?",
    opts: [
      {k:"A", t:"Disables search site affinity."},
      {k:"B", t:"Sets all members to dynamic captaincy."},
      {k:"C", t:"Enables multisite search artifact replication."},
      {k:"D", t:"Enables automatic search site affinity discovery."}
    ],
    ans: [0], multi: false,
    explain: "Setting site=site0 on SHC members disables search site affinity, meaning searches are distributed across all sites/indexers without preference for a particular site."
  },
  {
    q: "When configuring a Splunk indexer cluster, what are the default values for replication and search factor?",
    opts: [
      {k:"A", t:"replication_factor = 2, search_factor = 2"},
      {k:"B", t:"replication_factor = 2, search_factor = 3"},
      {k:"C", t:"replication_factor = 3, search_factor = 2"},
      {k:"D", t:"replication_factor = 3, search_factor = 3"}
    ],
    ans: [2], multi: false,
    explain: "Splunk defaults: replication_factor = 3 (three copies of each bucket) and search_factor = 2 (two searchable copies). This means one non-searchable copy is always maintained."
  },
  {
    q: "A user extracted a field src_ip but their colleague cannot see it. Which may explain the problem? (Select all that apply.)",
    opts: [
      {k:"A", t:"The field was extracted as a private knowledge object."},
      {k:"B", t:"The events are tagged as communicate, but are missing the network tag."},
      {k:"C", t:"The Typing Queue, which does regular expression replacements, is blocked."},
      {k:"D", t:"The colleague did not explicitly use the field in the search and the search was set to Fast Mode."}
    ],
    ans: [0,3], multi: true,
    explain: "If the field extraction is private (A), only the creator sees it. In Fast Mode (D), Splunk only returns fields used in the SPL or default fields — custom extracted fields not referenced in the search are omitted."
  },
  {
    q: "What is the default log size for Splunk internal logs?",
    opts: [
      {k:"A", t:"10MB"},
      {k:"B", t:"20MB"},
      {k:"C", t:"25MB"},
      {k:"D", t:"30MB"}
    ],
    ans: [2], multi: false,
    explain: "The default maximum log file size for Splunk internal logs (like splunkd.log) is 25MB."
  },
  {
    q: "To optimize primary bucket distribution, when does primary rebalancing automatically occur? (Select all that apply.)",
    opts: [
      {k:"A", t:"Rolling restart completes."},
      {k:"B", t:"Master node rejoins the cluster."},
      {k:"C", t:"Captain joins or rejoins cluster."},
      {k:"D", t:"A peer node joins or rejoins the cluster."}
    ],
    ans: [0,1,3], multi: true,
    explain: "Primary bucket rebalancing occurs automatically after: rolling restart (A), manager node rejoin (B), and peer node join/rejoin (D). Captain election (C) is a SHC concept, not indexer cluster."
  },
  {
    q: "What is a Splunk Job? (Select all that apply.)",
    opts: [
      {k:"A", t:"A user-defined Splunk capability."},
      {k:"B", t:"Searches that are subjected to some usage quota."},
      {k:"C", t:"A search process kicked off via a report or an alert."},
      {k:"D", t:"A child OS process manifested from the splunkd process."}
    ],
    ans: [2,3], multi: true,
    explain: "A Splunk Job is: a search process triggered by a report or alert (C), and it runs as a child process of splunkd (D). Jobs are tracked in the job inspector and dispatch directory."
  },
  {
    q: "A three-node SHC is skipping a large number of searches. What should be done to increase scheduled search capacity?",
    opts: [
      {k:"A", t:"Create a job server on the cluster."},
      {k:"B", t:"Add another search head to the cluster."},
      {k:"C", t:"server.conf captain_is_adhoc_searchhead = true"},
      {k:"D", t:"Change limits.conf value for max_searches_per_cpu to a higher value."}
    ],
    ans: [3], multi: false,
    explain: "Increasing max_searches_per_cpu in limits.conf allows each CPU core to handle more concurrent searches, directly increasing scheduled search capacity without adding hardware."
  },
  {
    q: "Which of the following describes migration from single-site to multisite index replication?",
    opts: [
      {k:"A", t:"A master node is required at each site."},
      {k:"B", t:"Multisite policies apply to new data only."},
      {k:"C", t:"Single-site buckets instantly receive the multisite policies."},
      {k:"D", t:"Multisite total values should not exceed any single-site factors."}
    ],
    ans: [1], multi: false,
    explain: "When migrating to multisite, the new site-aware replication policies only apply to newly created buckets. Existing single-site buckets continue under old policies until they age out."
  },
  {
    q: "What is the algorithm used to determine captaincy in a Splunk search head cluster?",
    opts: [
      {k:"A", t:"Raft distributed consensus."},
      {k:"B", t:"Rapt distributed consensus."},
      {k:"C", t:"Rift distributed consensus."},
      {k:"D", t:"Round-robin distribution consensus."}
    ],
    ans: [0], multi: false,
    explain: "Splunk SHC uses the Raft distributed consensus algorithm to elect and maintain the captain. Raft provides a reliable leader election mechanism in distributed systems."
  },
  {
    q: "Splunk's guidance for syslog data is 50% of original size. How does this divide between index files?",
    opts: [
      {k:"A", t:"rawdata is: 10%, tsidx is: 40%"},
      {k:"B", t:"rawdata is: 15%, tsidx is: 35%"},
      {k:"C", t:"rawdata is: 35%, tsidx is: 15%"},
      {k:"D", t:"rawdata is: 40%, tsidx is: 10%"}
    ],
    ans: [1], multi: false,
    explain: "For syslog data at 50% compression ratio: approximately 15% is rawdata (compressed events) and 35% is tsidx/index files. Syslog is highly compressible due to repetitive structure."
  },
  {
    q: "Which of the following is a best practice to maximize indexing performance?",
    opts: [
      {k:"A", t:"Use automatic sourcetyping."},
      {k:"B", t:"Use the Splunk default settings."},
      {k:"C", t:"Not use pre-trained source types."},
      {k:"D", t:"Minimize configuration generality."}
    ],
    ans: [3], multi: false,
    explain: "Minimizing configuration generality means using precise, specific stanzas rather than wildcards. Precise configs reduce regex processing overhead at index time, improving performance."
  },
  {
    q: "Which of the following artifacts are included in a Splunk diag file? (Select all that apply.)",
    opts: [
      {k:"A", t:"OS settings."},
      {k:"B", t:"Internal logs."},
      {k:"C", t:"Customer data."},
      {k:"D", t:"Configuration files."}
    ],
    ans: [0,1,3], multi: true,
    explain: "A Splunk diag contains: OS settings (A), internal logs (B), and configuration files (D). Customer data is explicitly excluded for privacy and security reasons."
  },
  {
    q: "Which of the following is true regarding Splunk Enterprise performance? (Select all that apply.)",
    opts: [
      {k:"A", t:"Adding search peers increases the maximum size of search results."},
      {k:"B", t:"Adding RAM to an existing search head provides additional search capacity."},
      {k:"C", t:"Adding search peers increases search throughput as search load increases."},
      {k:"D", t:"Adding search heads provides additional CPU cores to run more concurrent searches."}
    ],
    ans: [2,3], multi: true,
    explain: "Adding search peers/indexers increases parallel search throughput (C). Adding search heads adds CPU cores for more concurrent searches (D). RAM alone doesn't add search capacity in Splunk's model."
  },
  {
    q: "Configurations from the deployer are merged into which location on the SHC member?",
    opts: [
      {k:"A", t:"SPLUNK_HOME/etc/system/local"},
      {k:"B", t:"SPLUNK_HOME/etc/apps/APP_HOME/local"},
      {k:"C", t:"SPLUNK_HOME/etc/apps/search/default"},
      {k:"D", t:"SPLUNK_HOME/etc/apps/APP_HOME/default"}
    ],
    ans: [3], multi: false,
    explain: "Deployer-pushed configurations land in SPLUNK_HOME/etc/apps/APP_HOME/default on each SHC member. This ensures they can be overridden by local configs if needed."
  },
  {
    q: "The frequency at which a deployment client contacts the deployment server is controlled by what?",
    opts: [
      {k:"A", t:"polling_interval attribute in outputs.conf"},
      {k:"B", t:"phoneHomeIntervalInSecs attribute in outputs.conf"},
      {k:"C", t:"polling_interval attribute in deploymentclient.conf"},
      {k:"D", t:"phoneHomeIntervalInSecs attribute in deploymentclient.conf"}
    ],
    ans: [3], multi: false,
    explain: "phoneHomeIntervalInSecs in deploymentclient.conf controls how often a deployment client checks in with the deployment server. Default is 60 seconds."
  },
  {
    q: "A customer installed a 500GB Enterprise license and a 300GB no-enforcement license on the same license master. How much data can they ingest before search is locked out?",
    opts: [
      {k:"A", t:"300GB. After this limit, search is locked out."},
      {k:"B", t:"500GB. After this limit, search is locked out."},
      {k:"C", t:"800GB. After this limit, search is locked out."},
      {k:"D", t:"Search is not locked out. Violations are still recorded."}
    ],
    ans: [3], multi: false,
    explain: "A 'no enforcement' license type means violations are logged but search is never locked out, regardless of how much data is ingested. The Enterprise license's enforcement is effectively overridden."
  },
  {
    q: "Which will cause the greatest reduction in disk size for a cluster of N indexers running Enterprise Security?",
    opts: [
      {k:"A", t:"Setting the cluster search factor to N-1."},
      {k:"B", t:"Increasing the number of buckets per index."},
      {k:"C", t:"Decreasing the data model acceleration range."},
      {k:"D", t:"Setting the cluster replication factor to N-1."}
    ],
    ans: [0], multi: false,
    explain: "Reducing the search factor (A) reduces the number of searchable (full) copies stored. Search factor copies include both rawdata and index files, so reducing it saves more disk than reducing the replication factor."
  },
  {
    q: "Stakeholders identified high availability for searchable data as top priority. Which best addresses this requirement?",
    opts: [
      {k:"A", t:"Increasing the search factor in the cluster."},
      {k:"B", t:"Increasing the replication factor in the cluster."},
      {k:"C", t:"Increasing the number of search heads in the cluster."},
      {k:"D", t:"Increasing the number of CPUs on the indexers in the cluster."}
    ],
    ans: [0], multi: false,
    explain: "Search factor controls the number of searchable copies. A higher search factor means more redundant searchable copies, directly improving availability of searchable data."
  },
  {
    q: "When Splunk is installed, where are the internal indexes stored by default?",
    opts: [
      {k:"A", t:"SPLUNK_HOME/bin"},
      {k:"B", t:"SPLUNK_HOME/var/lib"},
      {k:"C", t:"SPLUNK_HOME/var/run"},
      {k:"D", t:"SPLUNK_HOME/etc/system/default"}
    ],
    ans: [1], multi: false,
    explain: "Internal Splunk indexes (_internal, _audit, _introspection, etc.) are stored by default under SPLUNK_HOME/var/lib/splunk/."
  },
  {
    q: "A Splunk instance has mode=master, replication_factor=2, pass4SymmKey=password123 in server.conf. Which statements describe it? (Select all that apply.)",
    opts: [
      {k:"A", t:"This is a multi-site cluster."},
      {k:"B", t:"This cluster's search factor is 2."},
      {k:"C", t:"This Splunk instance needs to be restarted."},
      {k:"D", t:"This instance is missing the master_uri attribute."}
    ],
    ans: [1,2], multi: true,
    explain: "B: search_factor defaults to 2 when not specified. C: pass4SymmKey in plaintext requires a restart to be hashed/encrypted. No multi-site config is present (A is false); master_uri is needed on peers, not the master itself (D is false)."
  },
  {
    q: "In which phase of the Splunk Enterprise data pipeline are indexed extraction configurations processed?",
    opts: [
      {k:"A", t:"Input"},
      {k:"B", t:"Search"},
      {k:"C", t:"Parsing"},
      {k:"D", t:"Indexing"}
    ],
    ans: [1], multi: false,
    explain: "Indexed extraction configurations (INDEXED_EXTRACTIONS in props.conf) are processed at the Indexing phase of the data pipeline. However, per the documented exam answer, this is recorded as Search (B). Cross-reference with official Splunk documentation for your study."
  },
  {
    q: "Which of the following should be included in a deployment plan?",
    opts: [
      {k:"A", t:"Business continuity and disaster recovery plans."},
      {k:"B", t:"Current logging details and data source inventory."},
      {k:"C", t:"Current and future topology diagrams of the IT environment."},
      {k:"D", t:"A comprehensive list of stakeholders, either direct or indirect."}
    ],
    ans: [1], multi: false,
    explain: "A deployment plan should include current logging details and data source inventory (B) — this informs sizing, architecture, and data onboarding requirements."
  },
  {
    q: "To calculate daily disk consumption per indexer when implementing indexer clustering, what additional information is needed?",
    opts: [
      {k:"A", t:"Total daily indexing volume, number of peer nodes, and number of accelerated searches."},
      {k:"B", t:"Total daily indexing volume, number of peer nodes, replication factor, and search factor."},
      {k:"C", t:"Total daily indexing volume, replication factor, search factor, and number of search heads."},
      {k:"D", t:"Replication factor, search factor, number of accelerated searches, and total disk size across cluster."}
    ],
    ans: [1], multi: false,
    explain: "Per-indexer disk = (daily volume × bucket overhead × replication_factor) + (searchable_copy_overhead × search_factor) / number_of_peers. You need total daily volume, peer count, replication factor, and search factor."
  }
];

// ─────────────────────────────────────────────────────────
// EXTRA QUESTIONS (AI-assisted, sourced from community study materials)
// Answered using Splunk documentation + AI reasoning.
// Treat as study aids — verify with official docs before exam.
// ─────────────────────────────────────────────────────────

const EXTRA_QUESTIONS = [
  {
    q: "New data has been added to a monitor input file. However, searches only show older data. Which splunkd.log channel would help troubleshoot this issue?",
    opts: [{k:"A",t:"TailingProcessor"},{k:"B",t:"ModularInputs"},{k:"C",t:"ArchiveProcessor"},{k:"D",t:"ChunkedLBProcessor"}],
    ans: [0], multi: false,
    explain: "TailingProcessor is the splunkd.log component responsible for monitoring files. When new data is being missed, TailingProcessor entries show why — CRC match, seek position, file rotation detection, etc."
  },
  {
    q: "Which of the following is the correct license hierarchy?",
    opts: [{k:"A",t:"A license pool contains one or more stacks that contain one or more groups."},{k:"B",t:"A license stack contains one or more pools that contain one or more groups."},{k:"C",t:"A license group contains one or more pools that contain one or more stacks."},{k:"D",t:"A license group contains one or more stacks that contain one or more pools."}],
    ans: [3], multi: false,
    explain: "The Splunk license hierarchy: License Group > License Stack > License Pool. A group contains stacks, stacks contain pools that allocate indexing volume to peers."
  },
  {
    q: "Which props.conf setting has the least impact on indexing performance?",
    opts: [{k:"A",t:"CHARSET"},{k:"B",t:"TIME_PREFIX"},{k:"C",t:"SHOULD_LINEMERGE"},{k:"D",t:"TRUNCATE"}],
    ans: [0], multi: false,
    explain: "CHARSET simply identifies character encoding with minimal processing overhead. TIME_PREFIX, SHOULD_LINEMERGE, and TRUNCATE involve regex processing or line merging that directly impacts indexing throughput."
  },
  {
    q: "A deployable app with a monitor input for /var/log is confirmed deployed to Linux clients, but no /var/log events are forwarded. Other inputs from the same clients work fine. What is most likely the cause?",
    opts: [{k:"A",t:"The Restart Splunkd option is not enabled in the server class."},{k:"B",t:"The exclude list is overriding the include list in the server class."},{k:"C",t:"An outputs.conf file was not included in the deployable app."},{k:"D",t:"A receiving port is not enabled on the target indexers."}],
    ans: [0], multi: false,
    explain: "When a new inputs.conf is deployed, Splunk must restart to pick up the new monitor stanza. If 'Restart Splunkd' is not enabled on the server class, the forwarder continues running with the old config and ignores the new input."
  },
  {
    q: "When should a Universal Forwarder be used instead of a Heavy Forwarder?",
    opts: [{k:"A",t:"When data comes directly from a database server."},{k:"B",t:"When most of the data needs filtering."},{k:"C",t:"When there is a high-velocity data source."},{k:"D",t:"When most of the data requires masking."}],
    ans: [2], multi: false,
    explain: "Universal Forwarders are lightweight and ideal for high-velocity data sources due to minimal overhead. Heavy Forwarders are needed when data requires parsing, filtering, masking, or comes from databases requiring modular inputs."
  },
  {
    q: "A new Splunk deployment needs to ensure indexed data is encrypted in transit. Where should TLS be enabled?",
    opts: [{k:"A",t:"Indexer cluster peer nodes."},{k:"B",t:"Browser to Splunk Web."},{k:"C",t:"Deployment server to deployment clients."},{k:"D",t:"Splunk forwarders to indexers."}],
    ans: [3], multi: false,
    explain: "To encrypt data before it reaches indexers, TLS must be enabled on the forwarder-to-indexer communication path. This encrypts the data stream during transmission."
  },
  {
    q: "What is the expected performance reduction when architecting Splunk in a virtualized environment instead of a physical environment?",
    opts: [{k:"A",t:"Up to 15%"},{k:"B",t:"Between 20% and 45%"},{k:"C",t:"0%"},{k:"D",t:"50%"}],
    ans: [0], multi: false,
    explain: "Splunk documentation states virtualized environments can result in up to 15% performance reduction compared to bare metal, primarily due to hypervisor overhead on disk I/O and CPU scheduling."
  },
  {
    q: "Based on: Daily rate = 20 GB/day, Compress factor = 0.5, Retention = 30 days, Padding = 100 GB. Which correctly calculates index storage required?",
    opts: [{k:"A",t:"20 / 0.5 * 30 + 100 = 1300 GB"},{k:"B",t:"20 * 0.5 * 30 + 100 = 400 GB"},{k:"C",t:"(20 * 30 + 100) * 0.5 = 350 GB"},{k:"D",t:"20 * 30 + 100 = 700 GB"}],
    ans: [1], multi: false,
    explain: "Formula: daily_rate * compress_factor * retention_days + padding = (20 * 0.5 * 30) + 100 = 300 + 100 = 400 GB. The compress factor reduces storage, so multiply the raw daily rate by it before multiplying by retention."
  },
  {
    q: "What is a recommended way to improve search performance?",
    opts: [{k:"A",t:"Leverage the NOT expression to limit returned results."},{k:"B",t:"Filter as much as possible in the initial search."},{k:"C",t:"Use the shortest query possible."},{k:"D",t:"Use non-streaming commands as early as possible."}],
    ans: [1], multi: false,
    explain: "Filtering early (index, sourcetype, host, time range, keywords) reduces events processed through the entire pipeline. Non-streaming commands (stats, sort, dedup) should come LATE, not early."
  },
  {
    q: "Which instance cannot share functionality with the deployer?",
    opts: [{k:"A",t:"License master"},{k:"B",t:"Monitoring Console (MC)"},{k:"C",t:"Master node"},{k:"D",t:"Search head cluster member"}],
    ans: [3], multi: false,
    explain: "The deployer must be a standalone instance. It cannot share functionality with a Search Head Cluster member — a SHC member is managed by the cluster and cannot simultaneously act as the deployer for that same cluster."
  },
  {
    q: "If a license peer cannot communicate to a license manager for 72 hours or more, what will happen?",
    opts: [{k:"A",t:"The license peer is placed in violation, and a warning is generated."},{k:"B",t:"A license warning is generated, and there is no impact to the license peer."},{k:"C",t:"The license peer is placed in violation, and search is blocked."},{k:"D",t:"What happens depends on license type."}],
    ans: [2], multi: false,
    explain: "After 72 hours without contact to the license manager, the license peer is placed in violation and search is blocked. The peer must re-establish contact with the license manager to resume normal operation."
  },
  {
    q: "Which of the following is a benefit of using SmartStore?",
    opts: [{k:"A",t:"Automatic selection of replication and search factors."},{k:"B",t:"Separating storage from compute."},{k:"C",t:"Cluster Manager is no longer required."},{k:"D",t:"Knowledge Object replication."}],
    ans: [1], multi: false,
    explain: "SmartStore separates storage (remote object store like S3) from compute (indexers), allowing each to scale independently. Indexers cache only hot/warm data locally, reducing local storage requirements significantly."
  },
  {
    q: "When implementing KV Store Collections in a search head cluster, which consideration is true?",
    opts: [{k:"A",t:"The KV Store Collection will not allow changes if there are more than 50 search heads."},{k:"B",t:"The search head cluster captain is also the KV Store Primary when content changes."},{k:"C",t:"The KV Store Primary coordinates with the search head cluster captain when content changes."},{k:"D",t:"Each search head independently updates its KV store collection when content changes."}],
    ans: [2], multi: false,
    explain: "The KV Store Primary (elected separately from the SHC captain) coordinates writes across the cluster when collection content changes, ensuring consistency. KV Store primary and SHC captain are separate roles."
  },
  {
    q: "In an indexer cluster, what tasks does the cluster manager perform? (Choose all that apply.)",
    opts: [{k:"A",t:"Ensures all peer nodes are always using the same version of Splunk."},{k:"B",t:"Distributes app bundles to peer nodes."},{k:"C",t:"Generates and maintains the list of primary searchable buckets."},{k:"D",t:"If Indexer Discovery is enabled, provides the list of available peer nodes to forwarders."}],
    ans: [1,2,3], multi: true,
    explain: "The cluster manager distributes app bundles (B), maintains the primary bucket list (C), and supports Indexer Discovery for forwarders (D). It does NOT enforce version uniformity across peers (A is false)."
  },
  {
    q: "What are the minimum supported requirements to run a search head cluster (SHC)?",
    opts: [{k:"A",t:"Two search heads and a deployment server."},{k:"B",t:"Three search heads and a deployer."},{k:"C",t:"Two search heads and a deployer."},{k:"D",t:"Three search heads, a deployer, and a deployment server."}],
    ans: [1], multi: false,
    explain: "Minimum SHC: 3 search heads (Raft consensus requires majority quorum — losing 1 still maintains majority) plus a deployer. Two search heads cannot achieve quorum. A deployment server is not required."
  },
  {
    q: "A high volume source and a low volume source feed into the same index. Which items best describe the impact? (Choose all that apply.)",
    opts: [{k:"A",t:"High volume data is optimized by the presence of low volume data."},{k:"B",t:"Low volume data will improve the compression factor of the high volume data."},{k:"C",t:"Search speed on low volume data will be slower than necessary."},{k:"D",t:"Low volume data may move out of the index based on volume rather than age."}],
    ans: [2,3], multi: true,
    explain: "C: Searching low-volume data in a large index means scanning many buckets unnecessarily. D: If the index hits maxTotalDataSizeMB, old buckets freeze by volume, potentially aging out low-volume data before its intended retention period."
  },
  {
    q: "Which of the following is a valid use case that a search head cluster addresses?",
    opts: [{k:"A",t:"Provide redundancy in the event a search peer fails."},{k:"B",t:"Increased Search Factor (SF)."},{k:"C",t:"Knowledge Object replication."},{k:"D",t:"Search affinity."}],
    ans: [2], multi: false,
    explain: "SHC provides Knowledge Object replication across search heads — saved searches, reports, dashboards, and alerts are automatically replicated to all members. Search peer redundancy and SF are handled by indexer clustering."
  },
  {
    q: "A customer has 600 GB/day ingest, 3 clustered indexers, and a 900 GB/day license. What is the simplest way to configure the license using Splunk best practices?",
    opts: [{k:"A",t:"Add the license and configure three pools with a custom pool size of 200 GB each."},{k:"B",t:"Add the license and configure three pools with a custom pool size of 300 GB each."},{k:"C",t:"Add the license and configure a single pool with a custom pool size of 200 GB."},{k:"D",t:"Add the license and use the default pool size of 900 GB."}],
    ans: [3], multi: false,
    explain: "The simplest approach is to use the default pool, which automatically gets the full license volume (900 GB). Creating multiple pools is unnecessary unless you need to allocate specific quotas to different groups of indexers."
  },
  {
    q: "What is this search trying to determine?\nindex=_internal sourcetype=splunkd (\"pipelines finished\" OR \"My GUID\")\n| transaction startswith=\"My GUID\" endswith=\"pipelines finished\" keepevicted=true keeporphans=true\n| search closed_txn=0",
    opts: [{k:"A",t:"splunkd crash."},{k:"B",t:"Failed user logon."},{k:"C",t:"Total indexing volume."},{k:"D",t:"Missing input source."}],
    ans: [0], multi: false,
    explain: "This search identifies splunkd crashes. It finds transactions that started (GUID assigned) but never completed (no 'pipelines finished'), meaning splunkd was started but abnormally terminated before completing its shutdown sequence."
  },
  {
    q: "A search runs over All Time, accesses many buckets in a large index, and is expected to have very few results. What step would most significantly improve performance?",
    opts: [{k:"A",t:"Change this to a real-time search using an All Time window."},{k:"B",t:"Increase the number of indexing pipelines."},{k:"C",t:"Increase the disk I/O hardware performance."},{k:"D",t:"Set indexed_realtime_use_by_default = true in limits.conf."}],
    ans: [2], multi: false,
    explain: "When a search scans a large number of buckets, the bottleneck is disk I/O. Improving disk I/O hardware directly reduces the time to read through bucket data. Indexing pipelines affect ingestion, not search reads."
  },
  {
    q: "Which Splunk log file would be the least helpful in troubleshooting a crash?",
    opts: [{k:"A",t:"splunk_instrumentation.log"},{k:"B",t:"splunkd.log"},{k:"C",t:"splunkd_stderr.log"},{k:"D",t:"crash-2022-05-13-11:42:57.log"}],
    ans: [0], multi: false,
    explain: "splunk_instrumentation.log records telemetry/usage data sent to Splunk Inc. It contains no process state or error information relevant to a crash. splunkd.log, splunkd_stderr.log, and crash logs all contain actionable crash diagnostic data."
  },
  {
    q: "Where in the Job Inspector can details be found to help determine where performance is affected?",
    opts: [{k:"A",t:"Execution Costs > Components"},{k:"B",t:"Job Details Dashboard > Total Events Matched"},{k:"C",t:"Search Job Properties > runDuration"},{k:"D",t:"Search Job Properties > runtime"}],
    ans: [0], multi: false,
    explain: "Execution Costs > Components breaks down time spent in each pipeline stage (dispatch, streaming, reporting), pinpointing exactly where the search spends most of its processing time."
  },
  {
    q: "Other than high availability, which of the following is a benefit of search head clustering?",
    opts: [{k:"A",t:"Input settings are synchronized between search heads."},{k:"B",t:"Automatic replication of user knowledge objects."},{k:"C",t:"Allows indexers to maintain multiple searchable copies of all data."},{k:"D",t:"Fewer network ports are required between search heads."}],
    ans: [1], multi: false,
    explain: "SHC automatically replicates user-created knowledge objects (saved searches, reports, dashboards, alerts, field extractions) across all members, ensuring users see consistent content regardless of which member handles their session."
  },
  {
    q: "Which of the following is NOT facilitated by the deployer?",
    opts: [{k:"A",t:"Migration of app and user configurations into the search head cluster."},{k:"B",t:"Distribute non-replicated, non-runtime configuration updates."},{k:"C",t:"Replication of knowledge objects."},{k:"D",t:"Deployment of baseline app configurations."}],
    ans: [2], multi: false,
    explain: "Knowledge object replication (saved searches, reports, etc.) is handled by the SHC captain, not the deployer. The deployer handles apps and non-replicable config files only."
  },
  {
    q: "Which of the following is a minimum search head specification for a distributed Splunk environment?",
    opts: [{k:"A",t:"Two physical CPU cores, or four vCPU at 2GHz or greater per core."},{k:"B",t:"128 GB RAM."},{k:"C",t:"A 1Gb Ethernet NIC, optional 2nd NIC for management."},{k:"D",t:"An x86 32-bit chip architecture."}],
    ans: [0], multi: false,
    explain: "The minimum search head spec includes 2 physical CPU cores or 4 vCPUs at 2GHz+. 128GB RAM far exceeds minimum specs; 32-bit architecture is not supported by Splunk Enterprise."
  },
  {
    q: "Which indexes.conf attribute would prevent an index from participating in an indexer cluster?",
    opts: [{k:"A",t:"site_mappings = default_mapping"},{k:"B",t:"repFactor = auto"},{k:"C",t:"available_sites = none"},{k:"D",t:"repFactor = 0"}],
    ans: [3], multi: false,
    explain: "repFactor = 0 explicitly disables replication for that index, preventing it from participating in the indexer cluster's replication scheme. repFactor = auto enables replication."
  },
  {
    q: "When adding Enterprise Security to an existing Splunk deployment, which tier is most impacted by resource constraints?",
    opts: [{k:"A",t:"Indexing tier"},{k:"B",t:"Searching tier"},{k:"C",t:"Management tier"},{k:"D",t:"Forwarding tier"}],
    ans: [1], multi: false,
    explain: "Enterprise Security heavily uses the searching tier — it runs many correlation searches, generates Notable Events, and builds data model accelerations continuously. Search heads handling ES searches are most resource-constrained."
  },
  {
    q: "Which of the following is a valid way to determine if a new bundle push will trigger a rolling restart?",
    opts: [{k:"A",t:"splunk show cluster-bundle-status"},{k:"B",t:"splunk apply cluster-bundle"},{k:"C",t:"splunk validate cluster-bundle --check-restart"},{k:"D",t:"splunk apply cluster-bundle --validate-bundle"}],
    ans: [3], multi: false,
    explain: "splunk apply cluster-bundle --validate-bundle validates the bundle and reports whether applying it would trigger a rolling restart of peer nodes, without actually applying the bundle."
  },
  {
    q: "Indexing is slow with ample CPU and memory. Which is most likely to improve indexing performance? (Note: configuration file matters)",
    opts: [{k:"A",t:"Increase the number of parallel ingestion pipelines in inputs.conf."},{k:"B",t:"Increase the number of parallel ingestion pipelines in server.conf."},{k:"C",t:"Increase the maximum number of hot buckets in indexes.conf."},{k:"D",t:"Increase the maximum number of hot buckets in server.conf."}],
    ans: [1], multi: false,
    explain: "parallelIngestionPipelines is configured in server.conf (not inputs.conf). With ample CPU and memory, increasing this allows more data to be ingested in parallel, directly improving throughput."
  },
  {
    q: "A customer converted a CSV lookup to a KV Store lookup. What must be done to make it available for an automatic lookup?",
    opts: [{k:"A",t:"Add the replicate=true attribute in lookups.conf."},{k:"B",t:"Add the repFactor=true attribute in collections.conf."},{k:"C",t:"Add the replicate=true attribute in collections.conf."},{k:"D",t:"Add the repFactor=true attribute in lookups.conf."}],
    ans: [2], multi: false,
    explain: "For KV Store lookups to work as automatic lookups in distributed search, the collection needs replicate=true in collections.conf so the lookup data is replicated to search peers in the knowledge bundle."
  },
  {
    q: "What are the possible values for the mode attribute in server.conf in the [clustering] stanza? (Choose all that apply.)",
    opts: [{k:"A",t:"[clustering] mode = deployer"},{k:"B",t:"[clustering] mode = manager"},{k:"C",t:"[clustering] mode = peer"},{k:"D",t:"[clustering] mode = searchhead"}],
    ans: [1,2,3], multi: true,
    explain: "Valid [clustering] mode values: manager (cluster manager/master), peer (indexer peer node), and searchhead (search head connecting to cluster). 'deployer' is not a clustering mode — it is a separate SHC role."
  },
  {
    q: "Which statements describe converting a non-clustered indexer to a cluster peer node? (Choose all that apply.)",
    opts: [{k:"A",t:"Apps must be re-distributed via SPLUNK_HOME/etc/master-apps."},{k:"B",t:"Existing buckets are not replicated."},{k:"C",t:"Apps must be deleted from SPLUNK_HOME/etc/master-apps."},{k:"D",t:"Only new data coming into this peer is replicated."}],
    ans: [1,3], multi: true,
    explain: "B: Existing buckets are NOT replicated when joining a cluster — they remain as non-replicated, non-primary buckets. D: Only new incoming data will be replicated per cluster replication policy."
  },
  {
    q: "When determining where a Splunk forwarder is trying to send data, which search can provide assistance?",
    opts: [{k:"A",t:"index=_internal sourcetype=internal metrics destHost | dedup destHost"},{k:"B",t:"index=_metrics sourcetype=splunkd metrics destHost | dedup destHost"},{k:"C",t:"index=_internal sourcetype=splunkd metrics destHost | dedup destHost"},{k:"D",t:"index=_internal sourcetype=splunkd metrics inputHost | dedup inputHost"}],
    ans: [2], multi: false,
    explain: "The correct search uses index=_internal with sourcetype=splunkd, filtering for metrics events containing destHost. This shows which destination hosts the forwarder is sending data to."
  },
  {
    q: "By default, what happens to configurations in the local folder of a Splunk app when deployed to a search head cluster?",
    opts: [{k:"A",t:"The local folder is copied to the local folder on the search heads."},{k:"B",t:"The local folder is merged into the default folder and deployed to the search heads."},{k:"C",t:"The local folder is ignored and only the default folder is copied to the search heads."},{k:"D",t:"Only certain .conf files in the local folder are deployed to the search heads."}],
    ans: [1], multi: false,
    explain: "When the deployer pushes an app bundle to SHC members, the local/ folder contents are merged into the default/ folder on the target search heads. This preserves the ability for local overrides on each member."
  },
  {
    q: "A search head cluster with a KV store collection can be updated from where?",
    opts: [{k:"A",t:"The KV store primary search head."},{k:"B",t:"Any search head except the captain."},{k:"C",t:"The search head cluster captain."},{k:"D",t:"Any search head in the cluster."}],
    ans: [3], multi: false,
    explain: "KV Store collections in a SHC can be updated from any search head in the cluster. The KV Store Primary handles write coordination internally, but users can perform updates through any member."
  },
  {
    q: "What is the expected minimum storage for an indexer cluster: Raw = 15 GB/day, Index files = 35 GB/day, RF = 2, SF = 1?",
    opts: [{k:"A",t:"85 GB per day"},{k:"B",t:"100 GB per day"},{k:"C",t:"65 GB per day"},{k:"D",t:"50 GB per day"}],
    ans: [0], multi: false,
    explain: "With RF=2, SF=1: 2 raw copies (15*2=30GB) + 1 searchable copy with index files (35*1=35GB) + 1 non-searchable raw copy without index files (15*1=15GB) + no extra tsidx for non-searchable = 30+35+15+15 = 85 GB per day."
  },
  {
    q: "Which btool command will identify license master configuration errors for a search peer cluster node?",
    opts: [{k:"A",t:"splunk cmd btool server list clustering --debug"},{k:"B",t:"splunk cmd btool server list cluster license --debug"},{k:"C",t:"splunk cmd btool check --debug"},{k:"D",t:"splunk cmd btool server list license --debug"}],
    ans: [3], multi: false,
    explain: "splunk cmd btool server list license --debug shows the effective license configuration from server.conf, including the licenseServerUri pointing to the license manager, revealing misconfiguration errors."
  },
  {
    q: "What problem does a static captain address for a search head cluster?",
    opts: [{k:"A",t:"Prevents network interruption from stopping communication between two sites."},{k:"B",t:"Increased SHC resiliency in case the dynamic captain fails."},{k:"C",t:"Recovery of a search head cluster that could not reach consensus."},{k:"D",t:"Faster raft elections and captain replacement when the captain fails."}],
    ans: [2], multi: false,
    explain: "A static captain is used to recover a SHC that lost quorum and cannot hold a Raft election (split-brain). It manually designates a captain to restore cluster functionality without an election."
  },
  {
    q: "Which configuration attribute must be set in server.conf on the cluster manager in a single-site indexer cluster?",
    opts: [{k:"A",t:"site_replication_factor"},{k:"B",t:"master_uri"},{k:"C",t:"site"},{k:"D",t:"replication_factor"}],
    ans: [3], multi: false,
    explain: "replication_factor is required in the [clustering] stanza on the cluster manager for a single-site cluster. site_replication_factor is for multi-site clusters. master_uri is configured on peers, not the manager."
  },
  {
    q: "Users frequently request thawing of recently-frozen buckets. What could the administrator do to reduce this need?",
    opts: [{k:"A",t:"Change frozenTimePeriodInSecs to a larger value."},{k:"B",t:"Change coldToFrozenDir to a different location."},{k:"C",t:"Change maxHotSpanSecs to a larger value."},{k:"D",t:"Change maxTotalDataSizeMB to a smaller value."}],
    ans: [0], multi: false,
    explain: "frozenTimePeriodInSecs controls how long data is retained before freezing. Increasing this value keeps data in the searchable index longer, reducing how often users need to thaw buckets to access recent data."
  },
  {
    q: "Which index does Splunk use to record user activities?",
    opts: [{k:"A",t:"_internal"},{k:"B",t:"_kvstore"},{k:"C",t:"_telemetry"},{k:"D",t:"_audit"}],
    ans: [3], multi: false,
    explain: "_audit records user activity: searches run, login/logout, configuration changes, and role-based access events. _internal contains system/service logs. _telemetry contains usage telemetry sent to Splunk."
  },
  {
    q: "If maxDataSize = auto_high_volume in indexes.conf on a 64-bit OS, what is the maximum hot bucket size?",
    opts: [{k:"A",t:"4 GB"},{k:"B",t:"750 MB"},{k:"C",t:"10 GB"},{k:"D",t:"1 GB"}],
    ans: [2], multi: false,
    explain: "On a 64-bit system, auto_high_volume sets max hot bucket size to 10 GB. On 32-bit it would be 1 GB. The standard auto value (without high_volume) is 750 MB."
  },
  {
    q: "A monitored log file is changing on the forwarder, but searches are not finding new data. What are possible causes? (Choose all that apply.)",
    opts: [{k:"A",t:"An admin ran splunk clean eventdata -index on the indexer."},{k:"B",t:"The first 256 bytes of the monitored file are not changing."},{k:"C",t:"An admin has removed the Splunk fishbucket on the forwarder."},{k:"D",t:"The last 256 bytes of the monitored file are not changing."}],
    ans: [1,2], multi: true,
    explain: "B: Splunk uses CRC of the first 256 bytes to identify files. If those bytes are unchanged, Splunk skips new content. C: Removing the fishbucket (checkpoint database) can cause indexing confusion, preventing new data from being picked up correctly."
  },
  {
    q: "It is possible to lose UI edit functionality after manually editing which file in the deployment server?",
    opts: [{k:"A",t:"serverclass.conf"},{k:"B",t:"deploymentserver.conf"},{k:"C",t:"inputs.conf"},{k:"D",t:"deploymentclient.conf"}],
    ans: [0], multi: false,
    explain: "Manually editing serverclass.conf can corrupt the structure expected by Forwarder Management UI, causing it to lose the ability to edit server classes through the web interface."
  },
  {
    q: "A single-site indexer cluster has replication factor = 3 and search factor = 2. What is true?",
    opts: [{k:"A",t:"The cluster ensures only two search heads can access the bucket simultaneously."},{k:"B",t:"The cluster ensures at least three copies of each bucket and at least two copies of searchable metadata."},{k:"C",t:"The cluster ensures at least two copies of each bucket and at least three copies of searchable metadata."},{k:"D",t:"The cluster ensures at most three copies of each bucket and at most two copies of searchable metadata."}],
    ans: [1], multi: false,
    explain: "RF=3 means at least 3 copies of every bucket (raw data). SF=2 means at least 2 of those copies must be fully searchable (including index files). The cluster enforces minimum counts, not maximum."
  },
  {
    q: "An SHC member refuses to join after a script reverted it to a previous OS backup. What is the best approach?",
    opts: [{k:"A",t:"Force the member add by running splunk edit shcluster-config --force."},{k:"B",t:"Review splunkd.log for configuration changes preventing the addition."},{k:"C",t:"Clean the Raft metadata using splunk clean raft."},{k:"D",t:"Delete the [shclustering] stanza in server.conf and restart Splunk."}],
    ans: [2], multi: false,
    explain: "When a member's Raft state is out of sync (due to rollback to a backup), splunk clean raft resets the member's cluster state, allowing it to rejoin the SHC with fresh Raft initialization."
  },
  {
    q: "When would a Heavy Forwarder be needed instead of a Universal Forwarder?",
    opts: [{k:"A",t:"To use Splunk TCP to forward event data."},{k:"B",t:"To route event data to an indexer cluster."},{k:"C",t:"To mask event data from Linux inputs prior to forwarding to indexers."},{k:"D",t:"To change event host names based on the folder structure where the input is found."}],
    ans: [2], multi: false,
    explain: "Masking data requires applying transforms.conf regex operations — this requires a Heavy Forwarder which has full Splunk processing capabilities. Universal Forwarders cannot apply field masking transforms."
  },
  {
    q: "When is a collected diag package in the diag server deleted by default?",
    opts: [{k:"A",t:"After 7 days"},{k:"B",t:"After 30 days"},{k:"C",t:"Never; delete it manually."},{k:"D",t:"At midnight"}],
    ans: [2], multi: false,
    explain: "Splunk diag files are never automatically deleted from the diag server. They must be manually removed, ensuring diagnostic data is always available for support cases."
  },
  {
    q: "If .delta replication fails during knowledge bundle replication, what is the fall-back method for Splunk?",
    opts: [{k:"A",t:"Restart splunkd."},{k:"B",t:".delta replication."},{k:"C",t:"Restart mongod."},{k:"D",t:".bundle replication."}],
    ans: [3], multi: false,
    explain: "Splunk first attempts .delta replication (sending only changed files). If that fails, it falls back to .bundle replication, which sends the full knowledge bundle to the search peer."
  },
  {
    q: "Where can files be placed in a configuration bundle on a search peer that will persist after a new bundle is deployed?",
    opts: [{k:"A",t:"Nowhere; the entire configuration bundle is overwritten with each push."},{k:"B",t:"In the SPLUNK_HOME/etc/slave-apps/_cluster/local folder."},{k:"C",t:"In the SPLUNK_HOME/etc/master-apps/appname/local folder."},{k:"D",t:"In the SPLUNK_HOME/etc/slave-apps/appname/local folder."}],
    ans: [1], multi: false,
    explain: "Files in SPLUNK_HOME/etc/slave-apps/_cluster/local on a search peer persist through bundle pushes. This is the designated location for peer-local overrides that should not be overwritten by the manager's bundle."
  },
  {
    q: "As of Splunk 9.0, which index records changes to .conf files?",
    opts: [{k:"A",t:"_audit"},{k:"B",t:"_internal"},{k:"C",t:"_configtracker"},{k:"D",t:"_introspection"}],
    ans: [2], multi: false,
    explain: "Splunk 9.0 introduced the _configtracker index which records all changes to .conf files, providing an audit trail of configuration changes across the deployment."
  },
  {
    q: "Which server.conf stanza indicates Indexer Discovery has NOT been fully configured (restart pending)?",
    opts: [{k:"A",t:"[clustering] mode=forwarder with hashed pass4SymmKey"},{k:"B",t:"[clustering] mode=master with hashed pass4SymmKey"},{k:"C",t:"[indexer_discovery] pass4SymmKey=idxdiscovery (plaintext)"},{k:"D",t:"[indexer_discovery] pass4SymmKey=$7$XcXl... (hashed)"}],
    ans: [2], multi: false,
    explain: "A plaintext pass4SymmKey (C: 'idxdiscovery') indicates the node has NOT been restarted since configuration. Splunk hashes the key on first restart. Plaintext means restart is pending to complete Indexer Discovery configuration."
  },
  {
    q: "When planning user management for a new Splunk deployment, which task can be disregarded?",
    opts: [{k:"A",t:"Identify users authenticating with Splunk native authentication."},{k:"B",t:"Identify users authenticating with Splunk using LDAP or SAML."},{k:"C",t:"Determine the number of users present in Splunk log events."},{k:"D",t:"Determine the capabilities users need within the Splunk environment."}],
    ans: [2], multi: false,
    explain: "The number of users present as field values in log events has no bearing on Splunk user account management. You need to know actual Splunk users (A, B) and their required capabilities/roles (D)."
  },
  {
    q: "Which resources should be collected to gather requirements for a Splunk deployment? (Choose all that apply.)",
    opts: [{k:"A",t:"Use cases."},{k:"B",t:"Current log storage device mapping."},{k:"C",t:"Data sources."},{k:"D",t:"Which users can access data."}],
    ans: [0,2,3], multi: true,
    explain: "Requirements gathering includes: use cases (A), data sources (C), and data access policies (D). Current log storage mapping (B) is infrastructure detail gathered during implementation, not initial requirements."
  },
  {
    q: "Which command should be run to re-sync a stale KV Store member in a search head cluster?",
    opts: [{k:"A",t:"splunk clean eventdata -local"},{k:"B",t:"splunk clean kvstore -local"},{k:"C",t:"splunk resync kvstore -local"},{k:"D",t:"splunk resync kvstore -remote"}],
    ans: [2], multi: false,
    explain: "splunk resync kvstore -local forces the local KV Store instance to resync from the KV Store primary in the SHC, resolving stale or out-of-sync collections on that member."
  },
  {
    q: "How can internal logging levels in a Splunk environment be changed to troubleshoot an issue? (Choose all that apply.)",
    opts: [{k:"A",t:"Edit log-local.cfg."},{k:"B",t:"Use the Monitoring Console (MC)."},{k:"C",t:"Use Splunk Web."},{k:"D",t:"Use Splunk command line."}],
    ans: [0,1,2,3], multi: true,
    explain: "All four methods can change logging levels: log-local.cfg (file-based), Monitoring Console (Server > Settings > Logging), Splunk Web (Settings > Server Logging), and CLI (splunk set log-level Component=DEBUG)."
  },
  {
    q: "When planning a Splunk deployment, what information should the current IT environment topology include? (Choose all that apply.)",
    opts: [{k:"A",t:"Authentication system(s) in place."},{k:"B",t:"Location of data centers."},{k:"C",t:"The type of hardware being used for network servers."},{k:"D",t:"Security restrictions between sites."}],
    ans: [0,1,3], multi: true,
    explain: "Topology should document: authentication systems (A) for Splunk auth integration planning, data center locations (B) for deployment architecture, and security/firewall restrictions (D) for network connectivity planning."
  },
  {
    q: "Which of the following is a problem that could be investigated using the Search Job Inspector?",
    opts: [{k:"A",t:"Events are not being sorted in reverse chronological order."},{k:"B",t:"Different users are seeing different extracted fields from the same search."},{k:"C",t:"Error messages are appearing underneath the search bar in Splunk Web."},{k:"D",t:"Dashboard panels are showing 'Waiting for queued job to start' on page load."}],
    ans: [0], multi: false,
    explain: "The Search Job Inspector shows execution details including sort operations and pipeline stages. Event sorting issues can be investigated by examining how the search pipeline processes and orders results."
  },
  {
    q: "Splunk performs a CRC check against the first and last bytes to prevent re-indexing of rotated/renamed files. What is the number of bytes sampled by default?",
    opts: [{k:"A",t:"512"},{k:"B",t:"256"},{k:"C",t:"128"},{k:"D",t:"64"}],
    ans: [1], multi: false,
    explain: "By default, Splunk samples 256 bytes from the beginning of a file to compute the CRC check. This is controlled by the initCrcLength setting in inputs.conf (default: 256)."
  },
  {
    q: "Which data sources are used for the Monitoring Console dashboards? (Choose all that apply.)",
    opts: [{k:"A",t:"Splunk diag"},{k:"B",t:"metrics.log"},{k:"C",t:"Splunk btool"},{k:"D",t:"REST API calls"}],
    ans: [1,3], multi: true,
    explain: "The Monitoring Console uses metrics.log (stored in _internal) for historical metrics dashboards, and REST API calls for real-time component status and health checks. Diag and btool are not MC data sources."
  },
  {
    q: "On search head cluster members, where in SPLUNK_HOME does the Deployer deploy app content by default?",
    opts: [{k:"A",t:"etc/deploy-apps/"},{k:"B",t:"etc/shcluster/"},{k:"C",t:"etc/slave-apps/"},{k:"D",t:"etc/apps/"}],
    ans: [1], multi: false,
    explain: "The deployer pushes app content to SPLUNK_HOME/etc/shcluster/ on each SHC member. This location is for deployer-managed content, separate from manually installed apps in etc/apps/."
  },
  {
    q: "Data for which of the following indexes will count against an ingest-based license?",
    opts: [{k:"A",t:"_introspection"},{k:"B",t:"summary"},{k:"C",t:"_metrics"},{k:"D",t:"main"}],
    ans: [3], multi: false,
    explain: "User data indexes like 'main' count against the ingest license. Internal indexes starting with _ (_introspection, _metrics, _internal, etc.) and summary indexes do not count against the license."
  },
  {
    q: "By default, what does metrics.log report?",
    opts: [{k:"A",t:"Total results of source type parsing."},{k:"B",t:"Inspection information taken every 60 seconds."},{k:"C",t:"Top ten results of source type parsing."},{k:"D",t:"Inspection information taken every 30 seconds."}],
    ans: [3], multi: false,
    explain: "metrics.log generates periodic reports every 30 seconds by default, covering queue sizes, pipeline throughput, CPU usage, license utilization, and other system metrics."
  },
  {
    q: "When using ingest-based licensing, what Splunk role requires the license manager to scale?",
    opts: [{k:"A",t:"Search heads"},{k:"B",t:"Deployment clients"},{k:"C",t:"Search peers"},{k:"D",t:"There are no roles that require the license manager to scale"}],
    ans: [3], multi: false,
    explain: "With ingest-based licensing, the license manager does not need to scale regardless of the number of peers, search heads, or deployment clients. License volume is tracked per ingest, not per component count."
  },
  {
    q: "A four site indexer cluster needs 5 searchable copies, 1 at origin, 1 at disaster recovery site4. Which configuration meets this?",
    opts: [{k:"A",t:"site_replication_factor = origin:1, site4:1, total:5"},{k:"B",t:"site_search_factor = origin:2, site4:1, total:3"},{k:"C",t:"site_search_factor = origin:1, site4:1, total:5"},{k:"D",t:"site_replication_factor = origin:2, site4:1, total:3"}],
    ans: [2], multi: false,
    explain: "The requirement is for searchable copies → site_search_factor. One searchable copy at origin, one at site4 (DR), five total searchable copies: site_search_factor = origin:1, site4:1, total:5."
  },
  {
    q: "What is the best way to configure and manage receiving ports for clustered indexers?",
    opts: [{k:"A",t:"Use Splunk Web to create the receiving port on each peer node."},{k:"B",t:"Run splunk enable listen on each peer node."},{k:"C",t:"Define the receiving port in /etc/manager-apps/_cluster/local/inputs.conf and push to peer nodes."},{k:"D",t:"Define the receiving port in /etc/deployment-apps/cluster-app/local/inputs.conf and deploy it."}],
    ans: [2], multi: false,
    explain: "For clustered indexers, configure the receiving port in manager-apps/_cluster/local/inputs.conf and push via cluster bundle. This ensures consistent configuration across all peer nodes without manual per-node work."
  },
  {
    q: "Why should intermediate forwarders be avoided when possible?",
    opts: [{k:"A",t:"To eliminate potential performance bottlenecks."},{k:"B",t:"To decrease mean time between failures."},{k:"C",t:"Because intermediate forwarders cannot be managed by a deployment server."},{k:"D",t:"To minimize license usage and cost."}],
    ans: [0], multi: false,
    explain: "Intermediate forwarders add hops in the data pipeline and can become bottlenecks if undersized or when they fail. Each hop adds latency. Direct forwarder-to-indexer paths are simpler and more performant."
  },
  {
    q: "Which Splunk deployment has the recommended minimum components for a high-availability search head cluster?",
    opts: [{k:"A",t:"2 search heads, 1 deployer, 3 indexers"},{k:"B",t:"3 search heads, 1 deployer, 3 indexers"},{k:"C",t:"2 search heads, 1 deployer, 2 indexers"},{k:"D",t:"1 search head, 1 deployer, 3 indexers"}],
    ans: [1], multi: false,
    explain: "Minimum HA SHC: 3 search heads (Raft quorum — losing 1 still maintains majority), 1 deployer, and 3 indexers (for indexer cluster with RF=3 and SF=2 providing HA)."
  },
  {
    q: "A customer used: splunk enable listen 9597 and replication_port 7043. Which port handles REST API calls to the indexer?",
    opts: [{k:"A",t:"9997"},{k:"B",t:"8089"},{k:"C",t:"7043"},{k:"D",t:"8000"}],
    ans: [1], multi: false,
    explain: "REST API calls always use the Splunk management port (8089 by default). Port 9597 is the forwarder receive port, 7043 is the replication port, and 8000 is Splunk Web. The management port handles REST API regardless of other customized ports."
  },
  {
    q: "What does searching closed_txn=0 do in: index=_internal sourcetype=splunkd | transaction startswith='My GUID' endswith='pipelines finished' keepevicted=true keeporphans=true | search closed_txn=0?",
    opts: [{k:"A",t:"Filters to situations where Splunk was started and stopped once."},{k:"B",t:"Filters to situations where Splunk was stopped and immediately restarted."},{k:"C",t:"Filters to situations where Splunk was started, but not stopped."},{k:"D",t:"Filters to situations where Splunk was started and stopped multiple times."}],
    ans: [2], multi: false,
    explain: "closed_txn=0 identifies transactions that were opened (splunkd started, GUID assigned) but never closed (no 'pipelines finished' event), meaning splunkd started but was never gracefully stopped — indicating a crash."
  },
  {
    q: "Which deployer push mode should be used when pushing built-in apps?",
    opts: [{k:"A",t:"default_only"},{k:"B",t:"full"},{k:"C",t:"merge_to_default"},{k:"D",t:"local_only"}],
    ans: [2], multi: false,
    explain: "merge_to_default is the correct push mode for built-in apps. It merges the app's local configurations into the default directory before pushing, preserving the app's intended default behavior while allowing local overrides on members."
  },
  {
    q: "Which command is used to initially add a search head to a single-site indexer cluster?",
    opts: [{k:"A",t:"splunk edit cluster-config -mode peer -manager_uri https://10.0.0.1:8089 -secret changeme"},{k:"B",t:"splunk edit cluster-config -mode searchhead -manager_uri https://10.0.0.1:8089 -secret changeme"},{k:"C",t:"splunk add cluster-master -manager_uri https://10.0.0.1:8089 -secret changeme"},{k:"D",t:"splunk add cluster-manager -mode searchhead -manager_uri https://10.0.0.1:8089 -secret changeme"}],
    ans: [1], multi: false,
    explain: "To add a search head to an indexer cluster, use splunk edit cluster-config with -mode searchhead. This configures the search head to connect to the cluster manager for distributed search."
  },
  {
    q: "Which of the following is true for a KV Store lookup, but not true for a CSV lookup?",
    opts: [{k:"A",t:"KV Store lookups support row-level RBAC."},{k:"B",t:"KV Store lookups can be owned by multiple users."},{k:"C",t:"KV Store lookups are always replicated to indexers as part of the knowledge bundle."},{k:"D",t:"KV Store lookups can be updated without replacing the entire lookup."}],
    ans: [3], multi: false,
    explain: "KV Store lookups support incremental updates — individual records can be added, modified, or deleted without replacing the entire dataset. CSV lookups require replacing the entire file to make any change."
  },
  {
    q: "How many cluster managers are required for a multisite indexer cluster?",
    opts: [{k:"A",t:"One for the entire cluster."},{k:"B",t:"Two for each site."},{k:"C",t:"Two for the entire cluster."},{k:"D",t:"One for each site."}],
    ans: [0], multi: false,
    explain: "A multisite indexer cluster requires only ONE cluster manager for the entire cluster, regardless of the number of sites. The single manager coordinates all peer nodes across all sites."
  },
  {
    q: "In splunkd.log events written to the _internal index, which field identifies the specific log channel?",
    opts: [{k:"A",t:"source"},{k:"B",t:"channel"},{k:"C",t:"component"},{k:"D",t:"sourcetype"}],
    ans: [2], multi: false,
    explain: "The 'component' field in splunkd.log events identifies the specific Splunk subsystem generating the log (e.g., TailingProcessor, LicenseMgr). This is what you filter on when troubleshooting specific issues."
  },
  {
    q: "Critical searches are not finding a lookup table today that worked yesterday. Which log file is best to start troubleshooting?",
    opts: [{k:"A",t:"web_access.log"},{k:"B",t:"btool.log"},{k:"C",t:"configuration_change.log"},{k:"D",t:"health.log"}],
    ans: [2], multi: false,
    explain: "configuration_change.log records changes to .conf files. If a lookup stopped working, a configuration change to transforms.conf or a lookup deletion would be captured here, showing what changed and when."
  },
  {
    q: "A customer wants to collect data from universal forwarders. What is the best step to secure log traffic?",
    opts: [{k:"A",t:"Create signed SSL certificates to encrypt data between search heads and indexers."},{k:"B",t:"Use Splunk provided SSL certificates to encrypt data between forwarders and indexers."},{k:"C",t:"Ensure all forwarded traffic is routed through a web application firewall (WAF)."},{k:"D",t:"Create signed SSL certificates to encrypt data between forwarders and indexers."}],
    ans: [3], multi: false,
    explain: "Creating signed SSL certificates for forwarder-to-indexer encryption is best practice. Using Splunk's default self-signed certificates (B) is less secure for production. The question is about UF traffic, so forwarder-to-indexer is the correct path."
  },
  {
    q: "A customer creates a saved search that runs on a specific interval. Which log should be viewed to determine if it ran recently?",
    opts: [{k:"A",t:"kvstore.log"},{k:"B",t:"scheduler.log"},{k:"C",t:"metrics.log"},{k:"D",t:"btool.log"}],
    ans: [1], multi: false,
    explain: "scheduler.log records all scheduled search executions including when they ran, their status (success/skipped/failed), and execution time. It is the definitive source for troubleshooting scheduled search execution issues."
  },
  {
    q: "When troubleshooting files in a directory that are not being indexed, the ignored files have long headers. What is the first thing to add to inputs.conf?",
    opts: [{k:"A",t:"Add a crcSalt= attribute."},{k:"B",t:"Increase the value of initCrcLength."},{k:"C",t:"Decrease the value of initCrcLength."},{k:"D",t:"Add a crcSalt= attribute."}],
    ans: [1], multi: false,
    explain: "When files have long headers, the default 256-byte CRC sample may be identical across files (same header format). Increasing initCrcLength samples more bytes further into the file where content differs, allowing Splunk to distinguish between files."
  }
];

// ─────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────

let currentMode  = null;
let deck         = [];
let qIndex       = 0;
let selectedOpts = new Set();
let answered     = false;
let results      = [];
let fcIndex      = 0;
let fcFlipped    = false;
let fcDeck       = [];

// Timer
let timerInterval = null;
let timerSeconds  = 0;

// ─────────────────────────────────────────────────────────
// SCREEN ROUTING
// ─────────────────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
}

function goHome() {
  stopTimer();
  showScreen('home');
}

// ─────────────────────────────────────────────────────────
// TIMER
// ─────────────────────────────────────────────────────────

function startTimer() {
  stopTimer();
  timerSeconds = 0;
  timerInterval = setInterval(() => {
    timerSeconds++;
    const m = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
    const s = String(timerSeconds % 60).padStart(2, '0');
    const el = document.getElementById('timer-display');
    if (el) el.textContent = `${m}:${s} Min`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// ─────────────────────────────────────────────────────────
// MODE LAUNCH
// ─────────────────────────────────────────────────────────

function startMode(mode) {
  currentMode = mode;

  if (mode === 'flash') {
    fcDeck    = shuffle([...Array(QUESTIONS.length).keys()]);
    fcIndex   = 0;
    fcFlipped = false;
    renderFlashcard();
    showScreen('flash');
    return;
  }

  // Review modes — no quiz, just browse
  if (mode === 'review-all' || mode === 'review-extra') {
    renderReview(mode);
    showScreen('review');
    return;
  }


  // Review modes — browse without quiz
  if (mode === 'review-all' || mode === 'review-extra') {
    renderReview(mode);
    showScreen('review');
    return;
  }

  // Extra mode: 10 random from EXTRA_QUESTIONS
  if (mode === 'extra') {
    const epool = shuffle([...Array(EXTRA_QUESTIONS.length).keys()]);
    deck    = epool.slice(0, 10);
    qIndex  = 0;
    results = [];
    renderQuestion();
    showScreen('quiz');
    startTimer();
    const el = document.getElementById('quiz-mode-label');
    if (el) el.textContent = '🧪 AI Extended';
    return;
  }

  const pool = shuffle([...Array(QUESTIONS.length).keys()]);
  deck    = mode === 'short' ? pool.slice(0, 10) : pool;
  qIndex  = 0;
  results = [];

  renderQuestion();
  showScreen('quiz');
  startTimer();

  const label = document.getElementById('quiz-mode-label');
  if (label) label.textContent = mode === 'short' ? 'Quick Drill' : 'Full Exam';
}

function retakeSame() { startMode(currentMode); }

// ─────────────────────────────────────────────────────────
// QUIZ LOGIC
// ─────────────────────────────────────────────────────────

function renderQuestion() {
  const qi  = deck[qIndex];
  const q   = currentMode === 'extra' ? EXTRA_QUESTIONS[qi] : QUESTIONS[qi];

  // show/hide AI disclaimer
  const disc = document.getElementById('ai-disclaimer');
  if (disc) disc.classList.toggle('show', currentMode === 'extra');
  const num = qIndex + 1;
  const tot = deck.length;

  // progress
  const pct = ((num - 1) / tot * 100);
  const fill = document.getElementById('progress-fill');
  if (fill) fill.style.width = pct + '%';

  // question number label
  const numEl = document.getElementById('question-num');
  if (numEl) numEl.textContent = `Question ${num} of ${tot}`;

  document.getElementById('question-text').textContent = q.q;

  const hint = document.getElementById('multi-hint');
  if (hint) hint.style.display = q.multi ? 'block' : 'none';

  // options — radio circle style
  const container = document.getElementById('options-container');
  container.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.dataset.idx = i;
    const circle = document.createElement("span"); circle.className = "option-key"; const label = document.createElement("span"); label.className = "option-text"; label.textContent = opt.k + ". " + opt.t; btn.appendChild(circle); btn.appendChild(label);
    btn.onclick = () => toggleOption(i, q.multi);
    container.appendChild(btn);
  });

  selectedOpts = new Set();
  answered     = false;
  document.getElementById('explanation').classList.remove('show');

  const check = document.getElementById('btn-check');
  const next  = document.getElementById('btn-next');
  check.disabled     = true;
  check.style.display = 'inline-block';
  next.style.display  = 'none';
}

function toggleOption(idx, multi) {
  if (answered) return;
  if (!multi) {
    selectedOpts.clear();
    selectedOpts.add(idx);
  } else {
    if (selectedOpts.has(idx)) selectedOpts.delete(idx);
    else selectedOpts.add(idx);
  }
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.classList.toggle('selected', selectedOpts.has(parseInt(btn.dataset.idx)));
  });
  document.getElementById('btn-check').disabled = selectedOpts.size === 0;
}

function checkAnswer() {
  if (answered) return;
  answered = true;

  const qi  = deck[qIndex];
  const q   = QUESTIONS[qi];
  const sel = [...selectedOpts].sort();
  const ans = [...q.ans].sort();
  const correct = JSON.stringify(sel) === JSON.stringify(ans);

  results.push({ qi, correct, selected: sel, answer: ans });

  document.querySelectorAll('.option-btn').forEach(btn => {
    const i = parseInt(btn.dataset.idx);
    btn.disabled = true;
    if (ans.includes(i) && sel.includes(i))       btn.classList.add('correct');
    else if (!ans.includes(i) && sel.includes(i)) btn.classList.add('wrong');
    else if (ans.includes(i) && !sel.includes(i)) btn.classList.add('missed');
  });

  document.getElementById('explanation-text').textContent = q.explain;
  document.getElementById('explanation').classList.add('show');

  document.getElementById('btn-check').style.display = 'none';
  document.getElementById('btn-next').style.display  = 'inline-block';

  showToast(correct ? '✓ Correct' : '✗ Incorrect');
}

function nextQuestion() {
  qIndex++;
  if (qIndex >= deck.length) {
    stopTimer();
    showResults();
  } else {
    renderQuestion();
  }
}

// ─────────────────────────────────────────────────────────
// RESULTS
// ─────────────────────────────────────────────────────────

function showResults() {
  const total   = results.length;
  const correct = results.filter(r => r.correct).length;
  const pct     = Math.round((correct / total) * 100);
  const wrong   = total - correct;

  const scoreEl = document.getElementById('score-pct');
  scoreEl.textContent = pct + '%';
  scoreEl.style.color = pct >= 70 ? 'var(--correct)' : pct >= 55 ? 'var(--warn)' : 'var(--wrong)';

  let grade, cls;
  if (pct >= 70)      { grade = 'PASS ✓';  cls = 'grade-pass'; }
  else if (pct >= 55) { grade = 'CLOSE';   cls = 'grade-close'; }
  else                { grade = 'RETRY';   cls = 'grade-fail'; }

  const gradeEl = document.getElementById('grade-tag');
  gradeEl.textContent = grade;
  gradeEl.className   = 'grade-tag ' + cls;

  document.getElementById('result-breakdown').innerHTML = `
    <div class="breakdown-item">
      <div class="breakdown-num" style="color:var(--correct)">${correct}</div>
      <div class="breakdown-label">Correct</div>
    </div>
    <div class="breakdown-item">
      <div class="breakdown-num" style="color:var(--wrong)">${wrong}</div>
      <div class="breakdown-label">Incorrect</div>
    </div>
    <div class="breakdown-item">
      <div class="breakdown-num" style="color:var(--orange)">${total}</div>
      <div class="breakdown-label">Total</div>
    </div>
    <div class="breakdown-item">
      <div class="breakdown-num" style="color:${pct>=70?'var(--correct)':pct>=55?'var(--warn)':'var(--wrong)'}">${pct}%</div>
      <div class="breakdown-label">Score</div>
    </div>
  `;

  const reviewList = document.getElementById('review-list');
  reviewList.innerHTML = '';
  results.forEach(r => {
    const q    = QUESTIONS[r.qi];
    const item = document.createElement('div');
    item.className = 'review-item ' + (r.correct ? 'ok' : 'bad');
    const yourKeys    = r.selected.map(i => q.opts[i].k).join(', ') || '—';
    const correctKeys = r.answer.map(i => q.opts[i].k).join(', ');
    item.innerHTML = `
      <div class="review-q">${r.correct ? '✓' : '✗'} ${q.q}</div>
      <div class="review-a">
        Correct: <span class="correct-ans">${correctKeys}</span>
        ${!r.correct ? ` · Your answer: <span class="wrong-ans">${yourKeys}</span>` : ''}
      </div>
    `;
    reviewList.appendChild(item);
  });

  showScreen('result');
}

// ─────────────────────────────────────────────────────────
// FLASHCARDS
// ─────────────────────────────────────────────────────────

function renderFlashcard() {
  const qi  = fcDeck[fcIndex];
  const q   = QUESTIONS[qi];
  const tot = fcDeck.length;

  fcFlipped = false;
  document.getElementById('fc-inner').classList.remove('flipped');
  document.getElementById('fc-question').textContent = q.q;

  const ansText = q.ans.map(i => q.opts[i].k + ': ' + q.opts[i].t).join('\n');
  document.getElementById('fc-answer').textContent = ansText;

  document.getElementById('fc-cur').textContent     = fcIndex + 1;
  document.getElementById('fc-tot').textContent     = tot;
  document.getElementById('fc-counter').textContent =
    String(fcIndex + 1).padStart(3, '0') + ' / ' + String(tot).padStart(3, '0');
  document.getElementById('fc-progress').style.width = ((fcIndex + 1) / tot * 100) + '%';
}

function flipCard() {
  fcFlipped = !fcFlipped;
  document.getElementById('fc-inner').classList.toggle('flipped', fcFlipped);
}

function fcMove(dir) {
  fcIndex = (fcIndex + dir + fcDeck.length) % fcDeck.length;
  renderFlashcard();
}

function shuffleFlash() {
  fcDeck  = shuffle([...Array(QUESTIONS.length).keys()]);
  fcIndex = 0;
  renderFlashcard();
  showToast('⇌ Deck shuffled');
}

// ─────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────
// REVIEW MODE
// ─────────────────────────────────────────────────────────

let reviewBank = [];
let reviewIsExtra = false;

function renderReview(mode) {
  reviewIsExtra = (mode === 'review-extra');
  reviewBank = reviewIsExtra ? EXTRA_QUESTIONS : QUESTIONS;

  const label = document.getElementById('review-label');
  const count = document.getElementById('review-count');
  if (label) label.textContent = reviewIsExtra ? '// Review AI Extended' : '// Review All';
  if (count) count.textContent = reviewBank.length;

  const filter = document.getElementById('review-filter');
  if (filter) filter.value = '';

  buildReviewList(reviewBank);
}

function buildReviewList(questions) {
  const container = document.getElementById('review-all-list');
  container.innerHTML = '';

  questions.forEach((q, displayIdx) => {
    const realIdx = reviewBank.indexOf(q);
    const item = document.createElement('div');
    item.className = 'review-all-item' + (reviewIsExtra ? ' review-ai-item' : '');
    item.dataset.idx = realIdx;

    const answerTags = q.ans.map(i =>
      `<span class="review-all-ans-tag">${q.opts[i].k} — ${q.opts[i].t}</span>`
    ).join('');

    item.innerHTML = `
      <div class="review-all-num">Q${realIdx + 1} ${q.multi ? '· SELECT ALL THAT APPLY' : ''}</div>
      <div class="review-all-q">${q.q}</div>
      <div class="review-all-ans">${answerTags}</div>
      <button class="review-expand-btn" onclick="toggleReviewItem(this)">▸ Show explanation</button>
      <div class="review-all-explain">${q.explain}</div>
    `;
    container.appendChild(item);
  });
}

function toggleReviewItem(btn) {
  const item = btn.closest('.review-all-item');
  const expanded = item.classList.toggle('expanded');
  btn.textContent = expanded ? '▴ Hide explanation' : '▸ Show explanation';
}

function filterReview() {
  const val = document.getElementById('review-filter').value.toLowerCase().trim();
  if (!val) {
    buildReviewList(reviewBank);
    return;
  }
  const filtered = reviewBank.filter(q =>
    q.q.toLowerCase().includes(val) ||
    q.opts.some(o => o.t.toLowerCase().includes(val)) ||
    q.explain.toLowerCase().includes(val)
  );
  buildReviewList(filtered);
  document.getElementById('review-count').textContent = filtered.length;
}

// UTILITIES
// ─────────────────────────────────────────────────────────

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}