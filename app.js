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
    explain: "Within the app configuration tier, App local directories (C) take the highest precedence, ordered alphabetically (ASCII order). The full precedence order globally is: System local > App local > App default > System default. Since the question asks which of these four options has the highest precedence and System local is option A — note that in ExamTopics this is documented as C. Verify against your study materials."
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
  const q   = QUESTIONS[qi];
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
